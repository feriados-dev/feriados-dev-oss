import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';
import { impactEventService } from '../../src/services/impactEvent.service';

jest.mock('../../src/services/impactEvent.service');

describe('Impact events endpoints', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns filtered high-impact events publicly', async () => {
    (impactEventService.searchImpactEvents as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 'event-2026-brazil-morocco',
          slug: 'copa-2026-brasil-marrocos',
          name: 'Copa 2026: Brasil x Marrocos',
          startsAt: new Date('2026-06-13T22:00:00.000Z'),
          endsAt: new Date('2026-06-14T00:00:00.000Z'),
          localDate: '2026-06-13',
          year: 2026,
          category: 'sports',
          impactLevel: 'high',
          impactScope: 'national',
          impactType: 'work_schedule_disruption',
          countryCode: 'BR',
          timezone: 'America/Sao_Paulo',
          businessImpactHint: 'Pode afetar expediente e atendimento.',
          isHoliday: false,
          status: 'scheduled',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      pagination: {
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      },
    });

    const response = await request(app)
      .get('/v1/impact-events?year=2026&category=sports&impactLevel=high')
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toMatchObject({
      slug: 'copa-2026-brasil-marrocos',
      isHoliday: false,
      impactLevel: 'high',
    });
    expect(impactEventService.searchImpactEvents).toHaveBeenCalledWith({
      year: 2026,
      category: 'sports',
      impactLevel: 'high',
    });
  });

  it('returns next impact events with country filter', async () => {
    (impactEventService.getNextImpactEvents as jest.Mock).mockResolvedValue([
      {
        id: 'event-2026-brazil-haiti',
        slug: 'copa-2026-brasil-haiti',
        name: 'Copa 2026: Brasil x Haiti',
        startsAt: new Date('2026-06-20T00:30:00.000Z'),
        localDate: '2026-06-19',
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
    ]);

    const response = await request(app)
      .get('/v1/impact-events/next?country=br&limit=3')
      .expect(200);

    expect(response.body.meta.count).toBe(1);
    expect(impactEventService.getNextImpactEvents).toHaveBeenCalledWith(3, 'BR');
  });

  it('rejects invalid dates', async () => {
    await request(app)
      .get('/v1/impact-events?startDate=2026-02-31')
      .expect(400);
  });

  it('rejects invalid pagination', async () => {
    await request(app)
      .get('/v1/impact-events?limit=0')
      .expect(400);
  });
});
