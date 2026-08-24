import { holidayService } from '../../../src/services/holiday.service';
import { holidayRepository } from '../../../src/repositories/holiday.repository';
import { locationService } from '../../../src/services/location.service';
import { Holiday, Location } from '../../../src/types';

jest.mock('../../../src/repositories/holiday.repository');
jest.mock('../../../src/services/location.service');

const saoPauloCity: Location = {
  id: 'loc-sao-paulo',
  type: 'municipality',
  code: 'SP-SAO-PAULO',
  name: 'São Paulo',
  stateCode: 'SP',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const saoPauloState: Location = {
  id: 'loc-sp',
  type: 'state',
  code: 'SP',
  name: 'São Paulo',
  stateCode: 'SP',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const rioCity: Location = {
  id: 'loc-rio',
  type: 'municipality',
  code: 'RJ-RIO-DE-JANEIRO',
  name: 'Rio de Janeiro',
  stateCode: 'RJ',
  createdAt: new Date(),
  updatedAt: new Date(),
};

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

const optionalHoliday = (date: string, name = 'Ponto Facultativo'): Holiday => ({
  ...holiday(date, 'optional', name),
  isFixed: false,
});

describe('HolidayService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (locationService.getLocationByCode as jest.Mock).mockResolvedValue(saoPauloCity);
  });

  it('returns next holidays using country, state and municipality hierarchy', async () => {
    const nextHolidays = [
      holiday('2026-06-04', 'municipal', 'Corpus Christi'),
      holiday('2026-07-09', 'state', 'Revolução Constitucionalista de 1932'),
      holiday('2026-09-07', 'national', 'Independência do Brasil'),
    ];
    (holidayRepository.findNextApplicableByLocation as jest.Mock).mockResolvedValue(nextHolidays);

    const result = await holidayService.getNextHolidays('SP-SAO-PAULO', 3);

    expect(result).toEqual(nextHolidays);
    expect(locationService.getLocationByCode).toHaveBeenCalledWith('SP-SAO-PAULO');
    expect(holidayRepository.findNextApplicableByLocation).toHaveBeenCalledWith(
      ['BR', 'SP', 'SP-SAO-PAULO'],
      expect.any(Date),
      3
    );
  });

  it('returns applicable holidays by year using country, state and municipality hierarchy', async () => {
    const holidays = [
      holiday('2026-01-01', 'national', 'Confraternização Universal'),
      holiday('2026-07-09', 'state', 'Revolução Constitucionalista de 1932'),
      holiday('2026-01-25', 'municipal', 'Aniversário de São Paulo'),
    ];
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue(holidays);

    const result = await holidayService.getApplicableHolidaysByYear('SP-SAO-PAULO', 2026);

    expect(result).toEqual(holidays);
    expect(locationService.getLocationByCode).toHaveBeenCalledWith('SP-SAO-PAULO');
    expect(holidayRepository.findApplicableByLocationDateRange).toHaveBeenCalledWith(
      ['BR', 'SP', 'SP-SAO-PAULO'],
      new Date('2026-01-01T00:00:00.000Z'),
      new Date('2026-12-31T00:00:00.000Z')
    );
  });

  it('accepts location as an alias when searching holidays', async () => {
    const holidays = [
      holiday('2026-01-01', 'national', 'Confraternização Universal'),
    ];
    (holidayRepository.findWithFilters as jest.Mock).mockResolvedValue({
      data: holidays,
      total: 1,
    });

    const result = await holidayService.searchHolidays({
      year: 2026,
      location: 'SP-SAO-PAULO',
      page: 2,
      limit: 10,
    });

    expect(result.pagination).toEqual({
      page: 2,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
    expect(locationService.getLocationByCode).toHaveBeenCalledWith('SP-SAO-PAULO');
    expect(holidayRepository.findWithFilters).toHaveBeenCalledWith({
      year: 2026,
      location: 'SP-SAO-PAULO',
      locationCodes: ['BR', 'SP', 'SP-SAO-PAULO'],
      page: 2,
      limit: 10,
    });
  });

  it('checks applicable holidays using country, state and municipality hierarchy', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      holiday('2026-11-15', 'national', 'Proclamação da República'),
      holiday('2026-11-15', 'municipal', 'Feriado municipal'),
    ]);

    const result = await holidayService.isHoliday('2026-11-15', 'SP-SAO-PAULO');

    expect(result.isHoliday).toBe(true);
    expect(result.location).toBe('SP-SAO-PAULO');
    expect(result.types).toEqual(['national', 'municipal']);
    expect(holidayRepository.findApplicableByLocationDateRange).toHaveBeenCalledWith(
      ['BR', 'SP', 'SP-SAO-PAULO'],
      new Date('2026-11-15T00:00:00.000Z'),
      new Date('2026-11-15T00:00:00.000Z')
    );
  });

  it('checks national, state and municipal holidays explicitly', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      holiday('2026-01-01', 'national', 'Confraternização Universal'),
      holiday('2026-07-09', 'state', 'Revolução Constitucionalista'),
      holiday('2026-01-25', 'municipal', 'Aniversário de São Paulo'),
    ]);

    const result = await holidayService.isHoliday('2026-01-25', 'SP-SAO-PAULO');

    expect(result.isHoliday).toBe(true);
    expect(result.types).toEqual(['national', 'state', 'municipal']);
  });

  it('returns false when no holiday applies', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([]);

    const result = await holidayService.isHoliday('2026-01-02', 'SP-SAO-PAULO');

    expect(result.isHoliday).toBe(false);
    expect(result.types).toEqual([]);
    expect(result.holidays).toEqual([]);
  });

  it('does not classify optional bridge days as holidays', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      optionalHoliday('2026-06-05', 'Sexta-feira após Corpus Christi'),
    ]);

    const result = await holidayService.isHoliday('2026-06-05', 'SP-SAO-PAULO');

    expect(result.isHoliday).toBe(false);
    expect(result.types).toEqual([]);
    expect(result.holidays).toEqual([]);
  });

  it('keeps market-wide optional dates classified as holidays', async () => {
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      optionalHoliday('2026-06-04', 'Corpus Christi'),
    ]);

    const result = await holidayService.isHoliday('2026-06-04', 'SP-SAO-PAULO');

    expect(result.isHoliday).toBe(true);
    expect(result.types).toEqual(['optional']);
    expect(result.holidays.map((item) => item.name)).toEqual(['Corpus Christi']);
  });

  it('compares holidays between a state and a municipality', async () => {
    const national = holiday('2026-09-07', 'national', 'Independência do Brasil');
    const state = holiday('2026-07-09', 'state', 'Revolução Constitucionalista');
    const municipal = holiday('2026-01-25', 'municipal', 'Aniversário de São Paulo');
    (locationService.getLocationByCode as jest.Mock).mockImplementation(async (code: string) =>
      code === 'SP' ? saoPauloState : saoPauloCity
    );
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock)
      .mockResolvedValueOnce([national, state])
      .mockResolvedValueOnce([national, state, municipal]);

    const result = await holidayService.compareHolidays(['SP', 'SP-SAO-PAULO'], 2026);

    expect(result.normalizedLocations.map(location => location.code)).toEqual(['SP', 'SP-SAO-PAULO']);
    expect(result.commonHolidays.map(item => item.name)).toEqual([
      'Revolução Constitucionalista',
      'Independência do Brasil',
    ]);
    expect(result.onlyInLocation.SP).toEqual([]);
    expect(result.onlyInLocation['SP-SAO-PAULO'].map(item => item.name)).toEqual(['Aniversário de São Paulo']);
    expect(result.totalByLocation).toEqual({ SP: 2, 'SP-SAO-PAULO': 3 });
  });

  it('compares holidays between two municipalities', async () => {
    const national = holiday('2026-09-07', 'national', 'Independência do Brasil');
    const saoPauloMunicipal = holiday('2026-01-25', 'municipal', 'Aniversário de São Paulo');
    const rioMunicipal = holiday('2026-01-20', 'municipal', 'São Sebastião');
    (locationService.getLocationByCode as jest.Mock).mockImplementation(async (code: string) =>
      code === 'SP-SAO-PAULO' ? saoPauloCity : rioCity
    );
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock)
      .mockResolvedValueOnce([national, saoPauloMunicipal])
      .mockResolvedValueOnce([national, rioMunicipal]);

    const result = await holidayService.compareHolidays(['SP-SAO-PAULO', 'RJ-RIO-DE-JANEIRO'], 2026);

    expect(result.commonHolidays.map(item => item.name)).toEqual(['Independência do Brasil']);
    expect(result.onlyInLocation['SP-SAO-PAULO'].map(item => item.name)).toEqual(['Aniversário de São Paulo']);
    expect(result.onlyInLocation['RJ-RIO-DE-JANEIRO'].map(item => item.name)).toEqual(['São Sebastião']);
  });

  it('returns long weekends and bridge opportunities for a location', async () => {
    const goodFriday = holiday('2026-04-03', 'national', 'Sexta-feira Santa');
    const tiradentes = holiday('2026-04-21', 'national', 'Tiradentes');
    const corpusChristi = holiday('2026-06-04', 'municipal', 'Corpus Christi');
    const saturdayHoliday = holiday('2026-08-15', 'municipal', 'Feriado no sábado');
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      goodFriday,
      tiradentes,
      corpusChristi,
      saturdayHoliday,
    ]);

    const result = await holidayService.getLongWeekends('SP-SAO-PAULO', 2026);

    expect(result).toEqual([
      {
        startDate: '2026-04-03',
        endDate: '2026-04-05',
        days: 3,
        type: 'long_weekend',
        bridgeDays: [],
        holidays: [goodFriday],
      },
      {
        startDate: '2026-04-18',
        endDate: '2026-04-21',
        days: 4,
        type: 'bridge',
        bridgeDays: ['2026-04-20'],
        holidays: [tiradentes],
      },
      {
        startDate: '2026-06-04',
        endDate: '2026-06-07',
        days: 4,
        type: 'bridge',
        bridgeDays: ['2026-06-05'],
        holidays: [corpusChristi],
      },
    ]);
  });

  it('merges adjacent long weekend windows and does not mark holidays as bridge days', async () => {
    const mondayHoliday = holiday('2026-09-07', 'national', 'Independência do Brasil');
    const tuesdayHoliday = holiday('2026-09-08', 'municipal', 'Feriado municipal');
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      mondayHoliday,
      tuesdayHoliday,
    ]);

    const result = await holidayService.getLongWeekends('SP-SAO-PAULO', 2026);

    expect(result).toEqual([
      {
        startDate: '2026-09-05',
        endDate: '2026-09-08',
        days: 4,
        type: 'long_weekend',
        bridgeDays: [],
        holidays: [mondayHoliday, tuesdayHoliday],
      },
    ]);
  });

  it('uses the civil date returned by PostgreSQL DATE values in non-UTC timezones', async () => {
    const goodFriday = {
      ...holiday('2026-04-03', 'national', 'Paixão de Cristo'),
      date: new Date(2026, 3, 3),
    };
    (holidayRepository.findApplicableByLocationDateRange as jest.Mock).mockResolvedValue([
      goodFriday,
    ]);

    const result = await holidayService.getLongWeekends('SP-SAO-PAULO', 2026);

    expect(result).toEqual([
      {
        startDate: '2026-04-03',
        endDate: '2026-04-05',
        days: 3,
        type: 'long_weekend',
        bridgeDays: [],
        holidays: [goodFriday],
      },
    ]);
  });
});
