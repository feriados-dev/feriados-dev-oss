import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';
import { holidayService } from '../../src/services/holiday.service';

jest.mock('../../src/services/holiday.service');

describe('Holiday endpoints', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('paginates holidays by year', async () => {
    (holidayService.searchHolidays as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 'holiday-2026-07-09',
          name: 'Revolução Constitucionalista de 1932',
          date: new Date('2026-07-09T00:00:00.000Z'),
          year: 2026,
          type: 'state',
          isFixed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      pagination: {
        page: 2,
        limit: 10,
        total: 11,
        totalPages: 2,
      },
    });

    const response = await request(app)
      .get('/v1/holidays/year/2026?state=SP&page=2&limit=10')
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toEqual({
      year: 2026,
      state: 'SP',
      count: 1,
    });
    expect(response.body.pagination).toEqual({
      page: 2,
      limit: 10,
      total: 11,
      totalPages: 2,
    });
    expect(holidayService.searchHolidays).toHaveBeenCalledWith({
      year: 2026,
      state: 'SP',
      page: 2,
      limit: 10,
    });
  });

  it('rejects invalid year pagination', async () => {
    await request(app)
      .get('/v1/holidays/year/2026?page=0')
      .expect(400);
  });

  it('returns next holidays for a location', async () => {
    (holidayService.getNextHolidays as jest.Mock).mockResolvedValue([
      {
        id: 'holiday-2026-07-09',
        name: 'Revolução Constitucionalista de 1932',
        date: new Date('2026-07-09T00:00:00.000Z'),
        year: 2026,
        type: 'state',
        isFixed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const response = await request(app)
      .get('/v1/holidays/next?location=SP-SAO-PAULO&limit=3')
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toEqual({
      location: 'SP-SAO-PAULO',
      count: 1,
    });
    expect(holidayService.getNextHolidays).toHaveBeenCalledWith('SP-SAO-PAULO', 3);
  });

  it('checks if a date is a holiday for a location', async () => {
    (holidayService.isHoliday as jest.Mock).mockResolvedValue({
      date: '2026-11-15',
      location: 'SP-SAO-PAULO',
      isHoliday: true,
      types: ['national'],
      holidays: [
        {
          id: 'holiday-2026-11-15',
          name: 'Proclamação da República',
          date: new Date('2026-11-15T00:00:00.000Z'),
          year: 2026,
          type: 'national',
          isFixed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    const response = await request(app)
      .get('/v1/holidays/is?date=2026-11-15&location=SP-SAO-PAULO')
      .expect(200);

    expect(response.body.data.isHoliday).toBe(true);
    expect(response.body.data.types).toEqual(['national']);
    expect(response.body.meta.location).toBe('SP-SAO-PAULO');
    expect(holidayService.isHoliday).toHaveBeenCalledWith('2026-11-15', 'SP-SAO-PAULO');
  });

  it('compares holidays between locations', async () => {
    (holidayService.compareHolidays as jest.Mock).mockResolvedValue({
      year: 2026,
      normalizedLocations: [
        { input: 'SP-SAO-PAULO', code: 'SP-SAO-PAULO', name: 'São Paulo', type: 'municipality' },
        { input: 'RJ-RIO-DE-JANEIRO', code: 'RJ-RIO-DE-JANEIRO', name: 'Rio de Janeiro', type: 'municipality' },
      ],
      commonHolidays: [
        {
          id: 'holiday-2026-09-07',
          name: 'Independência do Brasil',
          date: new Date('2026-09-07T00:00:00.000Z'),
          year: 2026,
          type: 'national',
          isFixed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      onlyInLocation: {
        'SP-SAO-PAULO': [],
        'RJ-RIO-DE-JANEIRO': [],
      },
      totalByLocation: {
        'SP-SAO-PAULO': 1,
        'RJ-RIO-DE-JANEIRO': 1,
      },
    });

    const response = await request(app)
      .get('/v1/holidays/compare?locations=SP-SAO-PAULO,RJ-RIO-DE-JANEIRO&year=2026')
      .expect(200);

    expect(response.body.data.commonHolidays).toHaveLength(1);
    expect(response.body.meta).toEqual({
      year: 2026,
      locations: ['SP-SAO-PAULO', 'RJ-RIO-DE-JANEIRO'],
    });
    expect(holidayService.compareHolidays).toHaveBeenCalledWith(
      ['SP-SAO-PAULO', 'RJ-RIO-DE-JANEIRO'],
      2026
    );
  });

  it('returns long weekends for a location', async () => {
    (holidayService.getLongWeekends as jest.Mock).mockResolvedValue([
      {
        startDate: '2026-04-18',
        endDate: '2026-04-21',
        days: 4,
        type: 'bridge',
        bridgeDays: ['2026-04-20'],
        holidays: [
          {
            id: 'holiday-2026-04-21',
            name: 'Tiradentes',
            date: new Date('2026-04-21T00:00:00.000Z'),
            year: 2026,
            type: 'national',
            isFixed: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ]);

    const response = await request(app)
      .get('/v1/holidays/long-weekends?location=SP-SAO-PAULO&year=2026')
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].bridgeDays).toEqual(['2026-04-20']);
    expect(response.body.meta).toEqual({
      year: 2026,
      location: 'SP-SAO-PAULO',
      count: 1,
    });
    expect(holidayService.getLongWeekends).toHaveBeenCalledWith('SP-SAO-PAULO', 2026);
  });

  it('rejects long weekends without a valid year', async () => {
    await request(app)
      .get('/v1/holidays/long-weekends?location=SP-SAO-PAULO&year=26')
      .expect(400);
  });

  it('does not route unknown holiday subpaths to the UUID detail endpoint', async () => {
    await request(app)
      .get('/v1/holidays/not-a-real-subpath')
      .expect(404);

    expect(holidayService.getHolidayById).not.toHaveBeenCalled();
  });

  it('rejects invalid dates', async () => {
    await request(app)
      .get('/v1/holidays/is?date=2026-02-31&location=SP')
      .expect(400);
  });
});
