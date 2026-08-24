import request from 'supertest';
import { createApp } from '../../src/app';
import { Application } from 'express';
import { holidayService } from '../../src/services/holiday.service';
import { Holiday } from '../../src/types';

jest.mock('../../src/services/holiday.service');

const mockHolidays: Holiday[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Confraternização Universal',
    date: new Date('2026-01-01'),
    year: 2026,
    type: 'national',
    description: 'Feriado nacional',
    isFixed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Tiradentes',
    date: new Date('2026-04-21'),
    year: 2026,
    type: 'national',
    isFixed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('GET /v1/holidays/ical', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
    (holidayService.getApplicableHolidaysByYear as jest.Mock).mockResolvedValue(mockHolidays);
  });

  it('returns text/calendar content type', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=SP')
      .expect(200)
      .expect('Content-Type', /text\/calendar/);

    expect(response.text).toContain('BEGIN:VCALENDAR');
    expect(response.text).toContain('VERSION:2.0');
    expect(response.text).toContain('END:VCALENDAR');
  });

  it('does not require an API key', async () => {
    const response = await request(app).get('/v1/holidays/ical?location=SP').expect(200);

    expect(response.text).toContain('BEGIN:VCALENDAR');
  });

  it('includes VEVENT blocks for holidays', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=BR')
      .expect(200);

    expect(response.text).toContain('BEGIN:VEVENT');
    expect(response.text).toContain('DTSTART;VALUE=DATE:20260101');
    expect(response.text).toContain('SUMMARY:Confraternização Universal');
    expect(response.text).toContain('END:VEVENT');
  });

  it('uses location in calendar name', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=RJ')
      .expect(200);

    expect(response.text).toMatch(/X-WR-CALNAME:Feriados RJ/);
  });

  it('accepts explicit year param', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=SP&year=2026')
      .expect(200);

    expect(response.text).toContain('BEGIN:VCALENDAR');
    expect((holidayService.getApplicableHolidaysByYear as jest.Mock)).toHaveBeenCalledWith('SP', 2026);
  });

  it('returns 400 when location is missing', async () => {
    await request(app)
      .get('/v1/holidays/ical')
      .expect(400);
  });

  it('sets aggressive cache headers', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=SP')
      .expect(200);

    expect(response.headers['cache-control']).toMatch(/max-age=86400/);
    expect(response.headers['cross-origin-resource-policy']).toBe('cross-origin');
  });

  it('returns content-disposition with .ics filename', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=SP')
      .expect(200);

    expect(response.headers['content-disposition']).toMatch(/\.ics/);
  });

  it('VEVENT uid contains holiday id and date', async () => {
    const response = await request(app)
      .get('/v1/holidays/ical?location=BR')
      .expect(200);

    expect(response.text).toContain('UID:20260101-a1b2c3d4-e5f6-7890-abcd-ef1234567890@api.feriados.dev');
  });
});
