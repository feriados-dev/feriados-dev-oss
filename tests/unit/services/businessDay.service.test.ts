import { businessDayService } from '../../../src/services/businessDay.service';
import { holidayRepository } from '../../../src/repositories/holiday.repository';
import { locationService } from '../../../src/services/location.service';
import { Holiday, Location } from '../../../src/types';

jest.mock('../../../src/repositories/holiday.repository');
jest.mock('../../../src/services/location.service');

const saoPaulo: Location = {
  id: 'loc-sp',
  type: 'state',
  code: 'SP',
  name: 'São Paulo',
  stateCode: 'SP',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const holiday = (date: string, name = 'Feriado'): Holiday => ({
  id: `holiday-${date}`,
  name,
  date: new Date(`${date}T00:00:00.000Z`),
  year: Number(date.slice(0, 4)),
  type: 'state',
  isFixed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const optionalHoliday = (date: string, name = 'Ponto Facultativo'): Holiday => ({
  ...holiday(date, name),
  type: 'optional',
  isFixed: false,
});

describe('BusinessDayService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (locationService.getLocationByCode as jest.Mock).mockResolvedValue(saoPaulo);
  });

  it('counts weekdays inclusively and removes holidays on weekdays', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      holiday('2026-01-01', 'Confraternização Universal'),
    ]);

    const result = await businessDayService.countBusinessDays('2026-01-01', '2026-01-07', 'SP');

    expect(result.businessDays).toBe(4);
    expect(result.calendarDays).toBe(7);
    expect(result.weekends).toBe(2);
    expect(result.holidays).toHaveLength(1);
    expect(holidayRepository.findApplicableByLocationDateRange).toHaveBeenCalledWith(
      ['BR', 'SP'],
      new Date('2026-01-01T00:00:00.000Z'),
      new Date('2026-01-07T00:00:00.000Z')
    );
  });

  it('adds business days starting from the next calendar day', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      holiday('2026-01-01', 'Confraternização Universal'),
    ]);

    const result = await businessDayService.addBusinessDays('2025-12-31', 1, 'SP');

    expect(result.resultDate).toBe('2026-01-02');
    expect(result.direction).toBe('forward');
    expect(result.holidays.map((h) => h.name)).toEqual(['Confraternização Universal']);
  });

  it('returns the next Monday when the input date is a weekend', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([]);

    const result = await businessDayService.nextBusinessDay('2026-01-03', 'SP');

    expect(result.resultDate).toBe('2026-01-05');
    expect(result.skippedDays).toBe(2);
    expect(result.includeCurrent).toBe(false);
    expect(result.holidays).toEqual([]);
  });

  it('skips holidays when finding the next business day', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      holiday('2026-01-01', 'Confraternização Universal'),
    ]);

    const result = await businessDayService.nextBusinessDay('2026-01-01', 'SP', true);

    expect(result.resultDate).toBe('2026-01-02');
    expect(result.skippedDays).toBe(1);
    expect(result.holidays.map((h) => h.name)).toEqual(['Confraternização Universal']);
  });

  it('returns the input date when includeCurrent is true and the date is a business day', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([]);

    const result = await businessDayService.nextBusinessDay('2026-01-02', 'SP', true);

    expect(result.resultDate).toBe('2026-01-02');
    expect(result.skippedDays).toBe(0);
  });

  it('checks whether a date is a business day', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([]);

    const result = await businessDayService.isBusinessDay('2026-01-03', 'SP');

    expect(result.isBusinessDay).toBe(false);
    expect(result.isWeekend).toBe(true);
  });

  it('does not block business days for optional bridge days', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      optionalHoliday('2026-06-05', 'Sexta-feira após Corpus Christi'),
    ]);

    const result = await businessDayService.isBusinessDay('2026-06-05', 'SP');

    expect(result.isBusinessDay).toBe(true);
    expect(result.holidays).toEqual([]);
  });

  it('keeps market-wide optional holidays as non-business days', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      optionalHoliday('2026-06-04', 'Corpus Christi'),
    ]);

    const result = await businessDayService.isBusinessDay('2026-06-04', 'SP');

    expect(result.isBusinessDay).toBe(false);
    expect(result.holidays.map((h) => h.name)).toEqual(['Corpus Christi']);
  });

  it('ignores optional bridge days when counting and finding the next business day', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      optionalHoliday('2026-04-20', 'Ponto Facultativo Nacional'),
      holiday('2026-04-21', 'Tiradentes'),
    ]);

    const count = await businessDayService.countBusinessDays('2026-04-20', '2026-04-22', 'SP');
    const next = await businessDayService.nextBusinessDay('2026-04-20', 'SP', true);

    expect(count.businessDays).toBe(2);
    expect(count.holidays.map((h) => h.name)).toEqual(['Tiradentes']);
    expect(next.resultDate).toBe('2026-04-20');
    expect(next.holidays).toEqual([]);
  });
});
