import { holidayRepository } from '@repositories/holiday.repository';
import { locationService } from '@services/location.service';
import {
  BusinessDayAddResult,
  BusinessDayCheckResult,
  BusinessDayCountResult,
  BusinessDayNextResult,
  Holiday,
  Location,
} from '@/types';
import { BadRequestError } from '@utils/errors';
import { blocksBusinessDay } from '@utils/holidayClassification';

const MS_PER_DAY = 86_400_000;
const MAX_COUNT_RANGE_DAYS = 3660;
const MAX_ADD_DAYS = 3660;
const MAX_NEXT_LOOKAHEAD_DAYS = 366;

type LocationWithDbFields = Location & {
  state_code?: string;
};

function dateFromIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function daysBetweenInclusive(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / MS_PER_DAY) + 1;
}

function isWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

function holidayDateKey(holiday: Holiday): string {
  return holiday.date instanceof Date
    ? formatIsoDate(holiday.date)
    : String(holiday.date).slice(0, 10);
}

function holidaySet(holidays: Holiday[]): Set<string> {
  return new Set(holidays.map(holidayDateKey));
}

function uniqueHolidaysOnBusinessDays(holidays: Holiday[]): Holiday[] {
  return holidays.filter((holiday) => !isWeekend(dateFromIsoDate(holidayDateKey(holiday))));
}

function applicableLocationCodes(location: Location): string[] {
  if (location.type === 'country') return [location.code];
  if (location.type === 'state') return ['BR', location.code];

  const stateCode = location.stateCode ?? (location as LocationWithDbFields).state_code;
  return stateCode ? ['BR', stateCode, location.code] : ['BR', location.code];
}

export class BusinessDayService {
  async countBusinessDays(from: string, to: string, locationCode: string): Promise<BusinessDayCountResult> {
    const start = dateFromIsoDate(from);
    const end = dateFromIsoDate(to);
    const calendarDays = daysBetweenInclusive(start, end);

    if (calendarDays > MAX_COUNT_RANGE_DAYS) {
      throw new BadRequestError(
        `Date range cannot exceed ${MAX_COUNT_RANGE_DAYS} days`,
        'DATE_RANGE_TOO_LARGE'
      );
    }

    const location = await locationService.getLocationByCode(locationCode);
    const holidays = await holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      start,
      end
    );
    const nonBusinessHolidays = holidays.filter(blocksBusinessDay);
    const holidayDates = holidaySet(nonBusinessHolidays);

    let businessDays = 0;
    let weekends = 0;

    for (let date = start; date <= end; date = addUtcDays(date, 1)) {
      if (isWeekend(date)) {
        weekends++;
        continue;
      }

      if (!holidayDates.has(formatIsoDate(date))) {
        businessDays++;
      }
    }

    return {
      from,
      to,
      location: location.code,
      businessDays,
      calendarDays,
      weekends,
      holidays: uniqueHolidaysOnBusinessDays(nonBusinessHolidays),
    };
  }

  async addBusinessDays(date: string, days: number, locationCode: string): Promise<BusinessDayAddResult> {
    if (Math.abs(days) > MAX_ADD_DAYS) {
      throw new BadRequestError(`days cannot exceed ${MAX_ADD_DAYS}`, 'DAYS_LIMIT_EXCEEDED');
    }

    const location = await locationService.getLocationByCode(locationCode);
    const direction = days > 0 ? 1 : days < 0 ? -1 : 0;

    if (direction === 0) {
      const check = await this.isBusinessDay(date, locationCode);
      return {
        startDate: date,
        resultDate: date,
        location: check.location,
        days,
        direction: 'none',
        holidays: check.holidays,
      };
    }

    const start = dateFromIsoDate(date);
    const rangeEnd = addUtcDays(start, direction * (Math.abs(days) * 3 + 366));
    const from = direction > 0 ? start : rangeEnd;
    const to = direction > 0 ? rangeEnd : start;
    const holidays = await holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      from,
      to
    );
    const nonBusinessHolidays = holidays.filter(blocksBusinessDay);
    const holidayDates = holidaySet(nonBusinessHolidays);

    let remaining = Math.abs(days);
    let cursor = start;

    while (remaining > 0) {
      cursor = addUtcDays(cursor, direction);
      if (!isWeekend(cursor) && !holidayDates.has(formatIsoDate(cursor))) {
        remaining--;
      }
    }

    const traversedHolidayDates = new Set<string>();
    for (const holiday of nonBusinessHolidays) {
      const key = holidayDateKey(holiday);
      const holidayTime = dateFromIsoDate(key).getTime();
      const isTraversed = direction > 0
        ? holidayTime > start.getTime() && holidayTime <= cursor.getTime()
        : holidayTime >= cursor.getTime() && holidayTime < start.getTime();

      if (isTraversed && !isWeekend(dateFromIsoDate(key))) {
        traversedHolidayDates.add(key);
      }
    }

    return {
      startDate: date,
      resultDate: formatIsoDate(cursor),
      location: location.code,
      days,
      direction: direction > 0 ? 'forward' : 'backward',
      holidays: nonBusinessHolidays.filter((holiday) => traversedHolidayDates.has(holidayDateKey(holiday))),
    };
  }

  async nextBusinessDay(
    date: string,
    locationCode: string,
    includeCurrent = false
  ): Promise<BusinessDayNextResult> {
    const start = dateFromIsoDate(date);
    const rangeEnd = addUtcDays(start, MAX_NEXT_LOOKAHEAD_DAYS);
    const location = await locationService.getLocationByCode(locationCode);
    const holidays = await holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      start,
      rangeEnd
    );
    const nonBusinessHolidays = holidays.filter(blocksBusinessDay);
    const holidayDates = holidaySet(nonBusinessHolidays);
    const skippedHolidayDates = new Set<string>();

    let cursor = includeCurrent ? start : addUtcDays(start, 1);

    while (cursor <= rangeEnd) {
      const key = formatIsoDate(cursor);
      const weekend = isWeekend(cursor);
      const holiday = holidayDates.has(key);

      if (!weekend && !holiday) {
        return {
          inputDate: date,
          resultDate: key,
          location: location.code,
          includeCurrent,
          skippedDays: Math.floor((cursor.getTime() - start.getTime()) / MS_PER_DAY),
          holidays: nonBusinessHolidays.filter((item) => skippedHolidayDates.has(holidayDateKey(item))),
        };
      }

      if (!weekend && holiday) {
        skippedHolidayDates.add(key);
      }

      cursor = addUtcDays(cursor, 1);
    }

    throw new BadRequestError(
      `Next business day not found within ${MAX_NEXT_LOOKAHEAD_DAYS} days`,
      'NEXT_BUSINESS_DAY_NOT_FOUND'
    );
  }

  async isBusinessDay(date: string, locationCode: string): Promise<BusinessDayCheckResult> {
    const target = dateFromIsoDate(date);
    const location = await locationService.getLocationByCode(locationCode);
    const holidays = await holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      target,
      target
    );
    const nonBusinessHolidays = holidays.filter(blocksBusinessDay);
    const weekend = isWeekend(target);

    return {
      date,
      location: location.code,
      isBusinessDay: !weekend && nonBusinessHolidays.length === 0,
      isWeekend: weekend,
      holidays: nonBusinessHolidays,
    };
  }
}

export const businessDayService = new BusinessDayService();
