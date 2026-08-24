import { DataStatusService } from '../../../src/services/dataStatus.service';
import { dataStatusRepository } from '../../../src/repositories/dataStatus.repository';

jest.mock('../../../src/repositories/dataStatus.repository', () => ({
  dataStatusRepository: {
    getSupportedCountries: jest.fn(),
    getCoveredYears: jest.fn(),
    getLocationTotals: jest.fn(),
    getHolidayTotalsByType: jest.fn(),
    getCoverageByYear: jest.fn(),
    getLastUpdated: jest.fn(),
  },
}));

describe('DataStatusService', () => {
  const service = new DataStatusService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds data coverage status with zero-filled holiday types', async () => {
    (dataStatusRepository.getSupportedCountries as jest.Mock).mockResolvedValue([
      { code: 'BR', name: 'Brasil' },
    ]);
    (dataStatusRepository.getCoveredYears as jest.Mock).mockResolvedValue([2025, 2026]);
    (dataStatusRepository.getLocationTotals as jest.Mock).mockResolvedValue({
      states: 27,
      municipalities: 5570,
    });
    (dataStatusRepository.getHolidayTotalsByType as jest.Mock).mockResolvedValue([
      { type: 'national', total: '24' },
      { type: 'municipal', total: '100' },
    ]);
    (dataStatusRepository.getCoverageByYear as jest.Mock).mockResolvedValue([
      { year: 2026, type: 'national', total: '12' },
      { year: 2026, type: 'municipal', total: '50' },
    ]);
    (dataStatusRepository.getLastUpdated as jest.Mock).mockResolvedValue({
      overall: new Date('2026-05-09T10:00:00.000Z'),
      holidays: new Date('2026-05-09T10:00:00.000Z'),
      locations: new Date('2026-05-08T10:00:00.000Z'),
      holidayLocations: null,
    });

    const result = await service.getStatus();

    expect(result.supportedCountries).toEqual([{ code: 'BR', name: 'Brasil' }]);
    expect(result.yearsCovered).toEqual({
      all: [2025, 2026],
      byCountry: { BR: [2025, 2026] },
    });
    expect(result.totals).toEqual({
      states: 27,
      municipalities: 5570,
      holidays: 124,
      holidaysByType: {
        national: 24,
        state: 0,
        municipal: 100,
        optional: 0,
      },
    });
    expect(result.coverageByYear).toEqual([
      {
        year: 2026,
        total: 62,
        byType: {
          national: 12,
          state: 0,
          municipal: 50,
          optional: 0,
        },
      },
    ]);
    expect(result.lastUpdated.holidayLocations).toBeNull();
    expect(result.lastUpdated.overall).toBe('2026-05-09T10:00:00.000Z');
    expect(result.knownGaps).toEqual([]);
  });
});
