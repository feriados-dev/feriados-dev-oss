import { Request, Response, NextFunction } from 'express';
import { holidayService } from '@services/holiday.service';
import { generateIcal } from '@utils/ical';
import { z } from 'zod';
import { BadRequestError } from '@utils/errors';

// Validation schemas
const yearParamSchema = z.object({
  year: z.string().regex(/^\d{4}$/).transform(Number),
});

const paginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
}).refine((value) => value.page === undefined || value.page >= 1, {
  message: 'page must be greater than or equal to 1',
  path: ['page'],
}).refine((value) => value.limit === undefined || (value.limit >= 1 && value.limit <= 100), {
  message: 'limit must be between 1 and 100',
  path: ['limit'],
});

const uuidParamSchema = z.object({
  id: z.string().uuid(),
});

const holidayQuerySchema = z.object({
  year: z.string().regex(/^\d{4}$/).transform(Number).optional(),
  state: z.string().length(2).optional(),
  city: z.string().optional(),
  location: z.string().min(2).optional(),
  type: z.enum(['national', 'state', 'municipal', 'optional']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
}).refine((value) => value.page === undefined || value.page >= 1, {
  message: 'page must be greater than or equal to 1',
  path: ['page'],
}).refine((value) => value.limit === undefined || (value.limit >= 1 && value.limit <= 100), {
  message: 'limit must be between 1 and 100',
  path: ['limit'],
});

const dateRangeQuerySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

const nextHolidaysQuerySchema = z.object({
  location: z.string().min(2),
  limit: z.string().transform(Number).default('5'),
});

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format')
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Invalid calendar date');

const isHolidayQuerySchema = z.object({
  date: isoDateSchema,
  location: z.string().min(2),
});

const compareHolidaysQuerySchema = z.object({
  locations: z.string().transform(value =>
    value.split(',').map(location => location.trim()).filter(Boolean)
  ).refine(locations => locations.length >= 2, 'At least two locations are required'),
  year: z.string().regex(/^\d{4}$/).transform(Number),
});

const longWeekendsQuerySchema = z.object({
  location: z.string().min(2),
  year: z.string().regex(/^\d{4}$/).transform(Number),
});

export class HolidayController {
  async getHolidayById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = uuidParamSchema.parse(req.params);
      const holiday = await holidayService.getHolidayById(id);

      res.json({
        status: 'success',
        data: holiday,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHolidaysByYear(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { year } = yearParamSchema.parse(req.params);
      const { state } = req.query;
      const { page, limit } = paginationQuerySchema.parse(req.query);

      const result = await holidayService.searchHolidays({
        year,
        state: state as string | undefined,
        page,
        limit,
      });

      res.json({
        status: 'success',
        data: result.data,
        meta: {
          year,
          state: state || 'all',
          count: result.data.length,
        },
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchHolidays(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = holidayQuerySchema.parse(req.query);
      const result = await holidayService.searchHolidays(params);

      res.json({
        status: 'success',
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHolidaysByDateRange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { startDate, endDate } = dateRangeQuerySchema.parse(req.query);

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        throw new BadRequestError('startDate must be before endDate');
      }

      const holidays = await holidayService.getHolidaysByDateRange(start, end);

      res.json({
        status: 'success',
        data: holidays,
        meta: {
          startDate,
          endDate,
          count: holidays.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getNextHolidays(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { location, limit } = nextHolidaysQuerySchema.parse(req.query);

      const holidays = await holidayService.getNextHolidays(
        location,
        typeof limit === 'string' ? parseInt(limit) : limit
      );

      res.json({
        status: 'success',
        data: holidays,
        meta: {
          location,
          count: holidays.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async isHoliday(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date, location } = isHolidayQuerySchema.parse(req.query);
      const result = await holidayService.isHoliday(date, location);

      res.json({
        status: 'success',
        data: result,
        meta: {
          date,
          location: result.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async compareHolidays(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { locations, year } = compareHolidaysQuerySchema.parse(req.query);
      const result = await holidayService.compareHolidays(locations, year);

      res.json({
        status: 'success',
        data: result,
        meta: {
          year,
          locations: result.normalizedLocations.map(location => location.code),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getLongWeekends(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { location, year } = longWeekendsQuerySchema.parse(req.query);
      const result = await holidayService.getLongWeekends(location, year);

      res.json({
        status: 'success',
        data: result,
        meta: {
          year,
          location,
          count: result.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getHolidaysIcal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { location, year } = z
        .object({
          location: z.string().min(2),
          year: z.string().regex(/^\d{4}$/).transform(Number).optional(),
        })
        .parse(req.query);

      const targetYear = year ?? new Date().getFullYear();
      const holidays = await holidayService.getApplicableHolidaysByYear(location, targetYear);

      const calName = `Feriados ${location.toUpperCase()} ${targetYear}`;
      const prodId = `-//Feriados.dev API//Feriados do Brasil ${location}//PT`;
      const ical = generateIcal(holidays, calName, prodId);

      res.set('Content-Type', 'text/calendar; charset=utf-8');
      res.set('Content-Disposition', `attachment; filename="feriados-${location.toLowerCase()}-${targetYear}.ics"`);
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.send(ical);
    } catch (error) {
      next(error);
    }
  }
}

export const holidayController = new HolidayController();
