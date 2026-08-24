import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';
import { businessDayService } from '../../src/services/businessDay.service';

jest.mock('../../src/services/businessDay.service');

describe('Business day endpoints', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns business day count', async () => {
    (businessDayService.countBusinessDays as jest.Mock).mockResolvedValue({
      from: '2026-01-01',
      to: '2026-01-07',
      location: 'SP',
      businessDays: 4,
      calendarDays: 7,
      weekends: 2,
      holidays: [],
    });

    const response = await request(app)
      .get('/v1/business-days?from=2026-01-01&to=2026-01-07&location=SP')
      .expect(200);

    expect(response.body.data.businessDays).toBe(4);
    expect(businessDayService.countBusinessDays).toHaveBeenCalledWith(
      '2026-01-01',
      '2026-01-07',
      'SP'
    );
  });

  it('returns a date after adding business days', async () => {
    (businessDayService.addBusinessDays as jest.Mock).mockResolvedValue({
      startDate: '2025-12-31',
      resultDate: '2026-01-02',
      location: 'SP',
      days: 1,
      direction: 'forward',
      holidays: [],
    });

    const response = await request(app)
      .get('/v1/business-days/add?date=2025-12-31&days=1&location=SP')
      .expect(200);

    expect(response.body.data.resultDate).toBe('2026-01-02');
    expect(businessDayService.addBusinessDays).toHaveBeenCalledWith('2025-12-31', 1, 'SP');
  });

  it('returns the next business day', async () => {
    (businessDayService.nextBusinessDay as jest.Mock).mockResolvedValue({
      inputDate: '2026-01-03',
      resultDate: '2026-01-05',
      location: 'SP',
      includeCurrent: false,
      skippedDays: 2,
      holidays: [],
    });

    const response = await request(app)
      .get('/v1/business-days/next?date=2026-01-03&location=SP')
      .expect(200);

    expect(response.body.data.resultDate).toBe('2026-01-05');
    expect(response.body.data.skippedDays).toBe(2);
    expect(businessDayService.nextBusinessDay).toHaveBeenCalledWith('2026-01-03', 'SP', false);
  });

  it('allows the current date when includeCurrent is true', async () => {
    (businessDayService.nextBusinessDay as jest.Mock).mockResolvedValue({
      inputDate: '2026-01-02',
      resultDate: '2026-01-02',
      location: 'SP',
      includeCurrent: true,
      skippedDays: 0,
      holidays: [],
    });

    const response = await request(app)
      .get('/v1/business-days/next?date=2026-01-02&location=SP&includeCurrent=true')
      .expect(200);

    expect(response.body.data.resultDate).toBe('2026-01-02');
    expect(businessDayService.nextBusinessDay).toHaveBeenCalledWith('2026-01-02', 'SP', true);
  });

  it('checks if a date is a business day', async () => {
    (businessDayService.isBusinessDay as jest.Mock).mockResolvedValue({
      date: '2026-01-03',
      location: 'SP',
      isBusinessDay: false,
      isWeekend: true,
      holidays: [],
    });

    const response = await request(app)
      .get('/v1/business-days/is?date=2026-01-03&location=SP')
      .expect(200);

    expect(response.body.data.isBusinessDay).toBe(false);
    expect(response.body.data.isWeekend).toBe(true);
  });

  it('rejects invalid date ranges', async () => {
    await request(app)
      .get('/v1/business-days?from=2026-01-07&to=2026-01-01&location=SP')
      .expect(400);
  });
});
