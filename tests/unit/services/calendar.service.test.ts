import { calendarService } from '../../../src/services/calendar.service';
import { holidayService } from '../../../src/services/holiday.service';
import { Holiday } from '../../../src/types';

jest.mock('../../../src/services/holiday.service');

const holiday = (date: string, type: Holiday['type'], name = 'Feriado'): Holiday => ({
  id: `holiday-${date}-${type}-${name.toLowerCase().replace(/\s+/g, '-')}`,
  name,
  date: new Date(`${date}T00:00:00.000Z`),
  year: Number(date.slice(0, 4)),
  type,
  isFixed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('CalendarService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds a monthly calendar with weekends, holidays and business day summary', async () => {
    const goodFriday = holiday('2026-04-03', 'national', 'Paixão de Cristo');
    const tiradentes = holiday('2026-04-21', 'national', 'Tiradentes');
    const outsideMonth = holiday('2026-05-01', 'national', 'Dia do Trabalho');
    (holidayService.getApplicableHolidaysByYear as jest.Mock).mockResolvedValue([
      goodFriday,
      tiradentes,
      outsideMonth,
    ]);

    const result = await calendarService.getMonth('SP-SAO-PAULO', 2026, 4);

    expect(result.year).toBe(2026);
    expect(result.month).toBe(4);
    expect(result.location).toBe('SP-SAO-PAULO');
    expect(result.days).toHaveLength(30);
    expect(result.summary).toEqual({
      calendarDays: 30,
      businessDays: 20,
      weekends: 8,
      holidays: 2,
    });
    expect(result.days[2]).toMatchObject({
      date: '2026-04-03',
      day: 3,
      weekday: 5,
      isWeekend: false,
      isHoliday: true,
      isBusinessDay: false,
      holidays: [goodFriday],
    });
    expect(result.days[4]).toMatchObject({
      date: '2026-04-05',
      weekday: 0,
      isWeekend: true,
      isHoliday: false,
      isBusinessDay: false,
    });
    expect(result.days[20].holidays).toEqual([tiradentes]);
  });

  it('uses civil dates from PostgreSQL DATE values in non-UTC timezones', async () => {
    const goodFriday = {
      ...holiday('2026-04-03', 'national', 'Paixão de Cristo'),
      date: new Date(2026, 3, 3),
    };
    (holidayService.getApplicableHolidaysByYear as jest.Mock).mockResolvedValue([goodFriday]);

    const result = await calendarService.getMonth('BR', 2026, 4);

    expect(result.days[2]).toMatchObject({
      date: '2026-04-03',
      isHoliday: true,
      holidays: [goodFriday],
    });
  });
});
