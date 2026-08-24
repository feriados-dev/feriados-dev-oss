import { holidayRepository } from '@repositories/holiday.repository';
import { locationService } from '@services/location.service';
import { cacheService } from './cache.service';
import {
  Holiday,
  HolidayCompareResult,
  HolidayCheckResult,
  HolidayQueryParams,
  Location,
  LongWeekendResult,
  PaginatedResponse,
} from '@/types';
import { BadRequestError, NotFoundError } from '@utils/errors';
import { logger } from '@utils/logger';
import { blocksBusinessDay } from '@utils/holidayClassification';

type LocationWithDbFields = Location & {
  state_code?: string;
};

function dateFromIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addUtcDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function daysBetweenInclusive(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000) + 1;
}

function holidayDateKey(holiday: Holiday): string {
  return holiday.date instanceof Date
    ? formatLocalIsoDate(holiday.date)
    : String(holiday.date).slice(0, 10);
}

function applicableLocationCodes(location: Location): string[] {
  if (location.type === 'country') return [location.code];
  if (location.type === 'state') return ['BR', location.code];

  const stateCode = location.stateCode ?? (location as LocationWithDbFields).state_code;
  return stateCode ? ['BR', stateCode, location.code] : ['BR', location.code];
}

export class HolidayService {
  async getHolidayById(id: string): Promise<Holiday> {
    const holiday = await holidayRepository.findById<Holiday>(id);

    if (!holiday) {
      throw new NotFoundError('Holiday not found');
    }

    return holiday;
  }

  async getHolidaysByYear(year: number, locationCode?: string): Promise<Holiday[]> {
    // Try cache first
    const cacheKey = locationCode ? `${year}-${locationCode}` : `${year}`;
    const cached = await cacheService.get<Holiday[]>('holidays', cacheKey);

    if (cached) {
      logger.debug('Holidays retrieved from cache', { year, locationCode });
      return cached;
    }

    // Fetch from database
    let holidays: Holiday[];

    if (locationCode) {
      const location = await locationService.getLocationByCode(locationCode);
      const start = dateFromIsoDate(`${year}-01-01`);
      const end = dateFromIsoDate(`${year}-12-31`);
      holidays = await holidayRepository.findApplicableByLocationDateRange(
        applicableLocationCodes(location),
        start,
        end
      );
    } else {
      holidays = await holidayRepository.findByYear(year);
    }

    // Store in cache
    await cacheService.set('holidays', cacheKey, holidays, 86400); // 24 hours

    return holidays;
  }

  async getHolidaysByDateRange(startDate: Date, endDate: Date): Promise<Holiday[]> {
    const cacheKey = `${startDate.toISOString()}-${endDate.toISOString()}`;
    const cached = await cacheService.get<Holiday[]>('holidays-range', cacheKey);

    if (cached) {
      logger.debug('Holidays retrieved from cache', { startDate, endDate });
      return cached;
    }

    const holidays = await holidayRepository.findByDateRange(startDate, endDate);

    await cacheService.set('holidays-range', cacheKey, holidays, 3600); // 1 hour

    return holidays;
  }

  async searchHolidays(params: HolidayQueryParams): Promise<PaginatedResponse<Holiday>> {
    const page = params.page || 1;
    const limit = Math.min(params.limit || 50, 100); // Max 100 per page

    let locationCodes: string[] | undefined;
    const rawLocationCode = params.location || params.city || params.state;
    if (rawLocationCode) {
      const location = await locationService.getLocationByCode(rawLocationCode);
      locationCodes = applicableLocationCodes(location);
    }

    const { data, total } = await holidayRepository.findWithFilters({
      ...params,
      locationCodes,
      page,
      limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getNextHolidays(locationCode: string, limit = 5): Promise<Holiday[]> {
    const today = dateFromIsoDate(new Date().toISOString().slice(0, 10));
    const location = await locationService.getLocationByCode(locationCode);

    return holidayRepository.findNextApplicableByLocation(
      applicableLocationCodes(location),
      today,
      limit
    );
  }

  async getApplicableHolidaysByYear(locationCode: string, year: number): Promise<Holiday[]> {
    const location = await locationService.getLocationByCode(locationCode);
    const start = dateFromIsoDate(`${year}-01-01`);
    const end = dateFromIsoDate(`${year}-12-31`);

    return holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      start,
      end
    );
  }

  async isHoliday(date: string, locationCode: string): Promise<HolidayCheckResult> {
    const target = dateFromIsoDate(date);
    const location = await locationService.getLocationByCode(locationCode);
    const holidays = await holidayRepository.findApplicableByLocationDateRange(
      applicableLocationCodes(location),
      target,
      target
    );
    const holidayChecks = holidays.filter(blocksBusinessDay);
    const types = [...new Set(holidayChecks.map((holiday) => holiday.type))];

    return {
      date,
      location: location.code,
      isHoliday: holidayChecks.length > 0,
      types,
      holidays: holidayChecks,
    };
  }

  async compareHolidays(locationCodes: string[], year: number): Promise<HolidayCompareResult> {
    const uniqueInputs = [...new Set(locationCodes.map(code => code.trim()).filter(Boolean))];
    if (uniqueInputs.length < 2) {
      throw new BadRequestError('At least two distinct locations are required', 'INVALID_LOCATIONS');
    }

    const locations = await Promise.all(
      uniqueInputs.map(async (input) => ({
        input,
        location: await locationService.getLocationByCode(input),
      }))
    );
    const normalizedCodes = new Set(locations.map(item => item.location.code));
    if (normalizedCodes.size < 2) {
      throw new BadRequestError('At least two distinct locations are required', 'INVALID_LOCATIONS');
    }

    const start = dateFromIsoDate(`${year}-01-01`);
    const end = dateFromIsoDate(`${year}-12-31`);
    const holidaysByLocation = await Promise.all(
      locations.map(async ({ location }) => ({
        location,
        holidays: await holidayRepository.findApplicableByLocationDateRange(
          applicableLocationCodes(location),
          start,
          end
        ),
      }))
    );

    const holidayIdsByLocation = holidaysByLocation.map(({ holidays }) =>
      new Set(holidays.map(holiday => holiday.id))
    );
    const commonIds = holidayIdsByLocation.reduce((common, ids) =>
      new Set([...common].filter(id => ids.has(id)))
    );

    const sortHolidays = (holidays: Holiday[]) => [...holidays].sort((a, b) => {
      const dateCompare = holidayDateKey(a).localeCompare(holidayDateKey(b));
      return dateCompare !== 0 ? dateCompare : a.name.localeCompare(b.name);
    });

    const commonHolidays = sortHolidays(
      holidaysByLocation[0].holidays.filter(holiday => commonIds.has(holiday.id))
    );
    const onlyInLocation: Record<string, Holiday[]> = {};
    const totalByLocation: Record<string, number> = {};

    for (const { location, holidays } of holidaysByLocation) {
      onlyInLocation[location.code] = sortHolidays(holidays.filter(holiday => !commonIds.has(holiday.id)));
      totalByLocation[location.code] = holidays.length;
    }

    return {
      year,
      normalizedLocations: locations.map(({ input, location }) => ({
        input,
        code: location.code,
        name: location.name,
        type: location.type,
      })),
      commonHolidays,
      onlyInLocation,
      totalByLocation,
    };
  }

  async getLongWeekends(locationCode: string, year: number): Promise<LongWeekendResult[]> {
    const holidays = await this.getApplicableHolidaysByYear(locationCode, year);
    const holidaysByDate = new Map<string, Holiday[]>();

    for (const holiday of holidays) {
      const key = holidayDateKey(holiday);
      holidaysByDate.set(key, [...(holidaysByDate.get(key) ?? []), holiday]);
    }

    const results = new Map<string, LongWeekendResult>();

    const addResult = (
      startDate: Date,
      endDate: Date,
      type: LongWeekendResult['type'],
      bridgeDays: string[],
      holidayDate: string
    ) => {
      const start = formatIsoDate(startDate);
      const end = formatIsoDate(endDate);
      const key = `${start}:${end}`;
      const actualBridgeDays = bridgeDays.filter((day) => !holidaysByDate.has(day));
      const resultType = actualBridgeDays.length > 0 ? type : 'long_weekend';
      const windowHolidays = [...holidaysByDate.entries()]
        .filter(([date]) => date >= start && date <= end)
        .flatMap(([, items]) => items)
        .sort((a, b) => holidayDateKey(a).localeCompare(holidayDateKey(b)));
      const existing = results.get(key);

      if (existing) {
        const existingBridgeDays = new Set(existing.bridgeDays);
        for (const bridgeDay of bridgeDays) existingBridgeDays.add(bridgeDay);

        const existingHolidayIds = new Set(existing.holidays.map((holiday) => holiday.id));
        const mergedHolidays = [
          ...existing.holidays,
          ...windowHolidays.filter((holiday) => !existingHolidayIds.has(holiday.id)),
        ].sort((a, b) => holidayDateKey(a).localeCompare(holidayDateKey(b)));

        results.set(key, {
          ...existing,
          type: existing.type === 'bridge' || resultType === 'bridge' ? 'bridge' : 'long_weekend',
          bridgeDays: [...existingBridgeDays].sort(),
          holidays: mergedHolidays,
        });
        return;
      }

      results.set(key, {
        startDate: start,
        endDate: end,
        days: daysBetweenInclusive(startDate, endDate),
        type: resultType,
        bridgeDays: actualBridgeDays,
        holidays: windowHolidays.length > 0 ? windowHolidays : holidaysByDate.get(holidayDate) ?? [],
      });
    };

    for (const date of [...holidaysByDate.keys()].sort()) {
      const holidayDate = dateFromIsoDate(date);
      const weekday = holidayDate.getUTCDay();

      if (weekday === 5) {
        addResult(holidayDate, addUtcDays(holidayDate, 2), 'long_weekend', [], date);
      } else if (weekday === 1) {
        addResult(addUtcDays(holidayDate, -2), holidayDate, 'long_weekend', [], date);
      } else if (weekday === 2) {
        addResult(
          addUtcDays(holidayDate, -3),
          holidayDate,
          'bridge',
          [formatIsoDate(addUtcDays(holidayDate, -1))],
          date
        );
      } else if (weekday === 4) {
        addResult(
          holidayDate,
          addUtcDays(holidayDate, 3),
          'bridge',
          [formatIsoDate(addUtcDays(holidayDate, 1))],
          date
        );
      }
    }

    return [...results.values()]
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .reduce<LongWeekendResult[]>((merged, current) => {
        const previous = merged[merged.length - 1];

        if (!previous || current.startDate > previous.endDate) {
          merged.push(current);
          return merged;
        }

        const holidayIds = new Set(previous.holidays.map((holiday) => holiday.id));
        previous.endDate = current.endDate > previous.endDate ? current.endDate : previous.endDate;
        previous.days = daysBetweenInclusive(
          dateFromIsoDate(previous.startDate),
          dateFromIsoDate(previous.endDate)
        );
        previous.bridgeDays = [...new Set([...previous.bridgeDays, ...current.bridgeDays])].sort();
        previous.type = previous.bridgeDays.length > 0 ? 'bridge' : 'long_weekend';
        previous.holidays = [
          ...previous.holidays,
          ...current.holidays.filter((holiday) => !holidayIds.has(holiday.id)),
        ].sort((a, b) => holidayDateKey(a).localeCompare(holidayDateKey(b)));

        return merged;
      }, []);
  }

  async createHoliday(
    holidayData: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>,
    locationIds: string[]
  ): Promise<Holiday> {
    const holiday = await holidayRepository.create(holidayData);

    // Link locations
    for (const locationId of locationIds) {
      await holidayRepository.linkLocation(holiday.id, locationId);
    }

    // Invalidate cache
    await cacheService.invalidatePattern('holidays*');

    logger.info('Holiday created', { holidayId: holiday.id });

    return holiday;
  }

  async deleteHoliday(id: string): Promise<void> {
    const deleted = await holidayRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError('Holiday not found');
    }

    // Invalidate cache
    await cacheService.invalidatePattern('holidays*');

    logger.info('Holiday deleted', { holidayId: id });
  }
}

export const holidayService = new HolidayService();
