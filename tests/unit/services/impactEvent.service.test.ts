import { impactEventService } from '../../../src/services/impactEvent.service';
import { impactEventRepository } from '../../../src/repositories/impactEvent.repository';
import { cacheService } from '../../../src/services/cache.service';

jest.mock('../../../src/repositories/impactEvent.repository');
jest.mock('../../../src/services/cache.service');

describe('ImpactEventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cacheService.get as jest.Mock).mockResolvedValue(null);
    (cacheService.set as jest.Mock).mockResolvedValue(undefined);
  });

  it('searches impact events with normalized defaults and pagination', async () => {
    (impactEventRepository.findWithFilters as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 'event-1',
          slug: 'copa-2026-brasil-marrocos',
          name: 'Copa 2026: Brasil x Marrocos',
          startsAt: new Date('2026-06-13T22:00:00.000Z'),
          localDate: '2026-06-13',
          year: 2026,
          category: 'sports',
          impactLevel: 'high',
          impactScope: 'national',
          impactType: 'work_schedule_disruption',
          countryCode: 'BR',
          timezone: 'America/Sao_Paulo',
          isHoliday: false,
          status: 'scheduled',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      total: 1,
    });

    const result = await impactEventService.searchImpactEvents({
      year: 2026,
      category: 'sports',
      impactLevel: 'high',
    });

    expect(impactEventRepository.findWithFilters).toHaveBeenCalledWith({
      year: 2026,
      category: 'sports',
      impactLevel: 'high',
      country: 'BR',
      page: 1,
      limit: 50,
    });
    expect(result.pagination).toEqual({
      page: 1,
      limit: 50,
      total: 1,
      totalPages: 1,
    });
    expect(result.data[0].isHoliday).toBe(false);
  });

  it('returns cached search results when available', async () => {
    const cached = {
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
    };
    (cacheService.get as jest.Mock).mockResolvedValue(cached);

    const result = await impactEventService.searchImpactEvents({ year: 2026 });

    expect(result).toBe(cached);
    expect(impactEventRepository.findWithFilters).not.toHaveBeenCalled();
  });

  it('returns next impact events by country', async () => {
    (impactEventRepository.findNext as jest.Mock).mockResolvedValue([]);

    await impactEventService.getNextImpactEvents(3, 'br');

    expect(impactEventRepository.findNext).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      3,
      'BR',
    );
  });
});
