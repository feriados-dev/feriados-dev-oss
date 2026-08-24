import request from 'supertest';
import { Application } from 'express';
import { createApp } from '../../src/app';
import { calendarService } from '../../src/services/calendar.service';

jest.mock('../../src/services/calendar.service');

describe('Calendar endpoints', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a monthly calendar for a location', async () => {
    (calendarService.getMonth as jest.Mock).mockResolvedValue({
      year: 2026,
      month: 4,
      location: 'SP-SAO-PAULO',
      days: [
        {
          date: '2026-04-03',
          day: 3,
          weekday: 5,
          isWeekend: false,
          isHoliday: true,
          isBusinessDay: false,
          holidays: [{ id: 'holiday-1', name: 'Paixão de Cristo', type: 'national' }],
        },
      ],
      summary: {
        calendarDays: 30,
        businessDays: 20,
        weekends: 8,
        holidays: 2,
      },
    });

    const response = await request(app)
      .get('/v1/calendar/month?location=SP-SAO-PAULO&year=2026&month=4')
      .expect(200);

    expect(response.body.data.summary.businessDays).toBe(20);
    expect(response.body.meta).toEqual({
      year: 2026,
      month: 4,
      location: 'SP-SAO-PAULO',
    });
    expect(calendarService.getMonth).toHaveBeenCalledWith('SP-SAO-PAULO', 2026, 4);
  });

  it('rejects invalid months', async () => {
    await request(app)
      .get('/v1/calendar/month?location=SP-SAO-PAULO&year=2026&month=13')
      .expect(400);
  });
});
