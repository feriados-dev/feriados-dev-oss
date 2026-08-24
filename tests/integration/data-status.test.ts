import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';
import { dataStatusService } from '../../src/services/dataStatus.service';

jest.mock('../../src/services/dataStatus.service');

describe('Data status endpoint', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns public data coverage metadata', async () => {
    (dataStatusService.getStatus as jest.Mock).mockResolvedValue({
      supportedCountries: [{ code: 'BR', name: 'Brasil' }],
      yearsCovered: {
        all: [2025, 2026],
        byCountry: { BR: [2025, 2026] },
      },
      totals: {
        states: 27,
        municipalities: 5570,
        holidays: 120,
        holidaysByType: {
          national: 20,
          state: 30,
          municipal: 70,
          optional: 0,
        },
      },
      coverageByYear: [
        {
          year: 2026,
          total: 60,
          byType: {
            national: 10,
            state: 15,
            municipal: 35,
            optional: 0,
          },
        },
      ],
      lastUpdated: {
        overall: '2026-05-09T10:00:00.000Z',
        holidays: '2026-05-09T10:00:00.000Z',
        locations: '2026-05-08T10:00:00.000Z',
        holidayLocations: '2026-05-09T09:00:00.000Z',
      },
      knownGaps: [],
    });

    const response = await request(app)
      .get('/v1/data/status')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('Cache-Control', /max-age=3600/);

    expect(response.body.status).toBe('success');
    expect(response.body.data.supportedCountries).toEqual([{ code: 'BR', name: 'Brasil' }]);
    expect(response.body.data.yearsCovered.all).toEqual([2025, 2026]);
    expect(response.body.data.totals.holidaysByType.national).toBe(20);
    expect(response.body.data.coverageByYear[0].year).toBe(2026);
    expect(response.body.data.lastUpdated.overall).toBe('2026-05-09T10:00:00.000Z');
    expect(dataStatusService.getStatus).toHaveBeenCalledTimes(1);
  });

  describe('GET /v1/data/changelog', () => {
    it('returns public data changelog entries', async () => {
      const response = await request(app)
        .get('/v1/data/changelog')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('Cache-Control', /max-age=600/);

      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.meta).toHaveProperty('total');
      expect(response.body.data[0]).toMatchObject({
        dateChanged: expect.any(String),
        holidayName: expect.any(String),
        holidayDate: expect.any(String),
        changeType: expect.any(String),
        affectedLocations: expect.any(Array),
        summary: expect.any(String),
      });
    });

    it('filters by location, change type and date period', async () => {
      const response = await request(app)
        .get('/v1/data/changelog?location=BR&changeType=added&since=2026-05-01&until=2026-05-31')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      for (const entry of response.body.data) {
        expect(entry.changeType).toBe('added');
        expect(entry.dateChanged >= '2026-05-01').toBe(true);
        expect(entry.dateChanged <= '2026-05-31').toBe(true);
        expect(entry.affectedLocations.some((location: { code: string }) => location.code === 'BR')).toBe(true);
      }
    });

    it('rejects invalid change type', async () => {
      await request(app).get('/v1/data/changelog?changeType=invalid').expect(400);
    });
  });

  describe('GET /v1/data/changelog.rss', () => {
    it('returns data changelog RSS XML', async () => {
      const response = await request(app)
        .get('/v1/data/changelog.rss')
        .expect(200)
        .expect('Content-Type', /rss\+xml/);

      expect(response.text).toContain('<?xml');
      expect(response.text).toContain('<title>Feriados.dev API - Changelog de dados</title>');
    });
  });
});
