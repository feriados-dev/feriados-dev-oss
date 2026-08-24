import { holidayService } from '@services/holiday.service';
import { CalendarMonthResult, Holiday } from '@/types';

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

function isWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

function holidayDateKey(holiday: Holiday): string {
  return holiday.date instanceof Date
    ? formatLocalIsoDate(holiday.date)
    : String(holiday.date).slice(0, 10);
}

export class CalendarService {
  async getMonth(locationCode: string, year: number, month: number): Promise<CalendarMonthResult> {
    const start = dateFromIsoDate(`${year}-${String(month).padStart(2, '0')}-01`);
    const end = new Date(Date.UTC(year, month, 0));
    const holidays = await holidayService.getApplicableHolidaysByYear(locationCode, year);
    const holidaysByDate = new Map<string, Holiday[]>();

    for (const holiday of holidays) {
      const key = holidayDateKey(holiday);
      if (key < formatIsoDate(start) || key > formatIsoDate(end)) continue;
      holidaysByDate.set(key, [...(holidaysByDate.get(key) ?? []), holiday]);
    }

    const days = [];
    let businessDays = 0;
    let weekends = 0;

    for (let cursor = start; cursor <= end; cursor = addUtcDays(cursor, 1)) {
      const date = formatIsoDate(cursor);
      const dayHolidays = holidaysByDate.get(date) ?? [];
      const weekend = isWeekend(cursor);
      const holiday = dayHolidays.length > 0;
      const businessDay = !weekend && !holiday;

      if (weekend) weekends++;
      if (businessDay) businessDays++;

      days.push({
        date,
        day: cursor.getUTCDate(),
        weekday: cursor.getUTCDay(),
        isWeekend: weekend,
        isHoliday: holiday,
        isBusinessDay: businessDay,
        holidays: dayHolidays,
      });
    }

    return {
      year,
      month,
      location: locationCode,
      days,
      summary: {
        calendarDays: days.length,
        businessDays,
        weekends,
        holidays: holidaysByDate.size,
      },
    };
  }
}

export const calendarService = new CalendarService();
