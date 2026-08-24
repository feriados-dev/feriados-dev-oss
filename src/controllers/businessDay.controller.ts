import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { businessDayService } from '@services/businessDay.service';
import { BadRequestError } from '@utils/errors';

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format')
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Invalid calendar date');

const countQuerySchema = z.object({
  from: isoDateSchema,
  to: isoDateSchema,
  location: z.string().min(2),
});

const addQuerySchema = z.object({
  date: isoDateSchema,
  days: z.string().regex(/^-?\d+$/).transform(Number),
  location: z.string().min(2),
});

const nextQuerySchema = z.object({
  date: isoDateSchema,
  location: z.string().min(2),
  includeCurrent: z.enum(['true', 'false']).optional().default('false').transform(value => value === 'true'),
});

const isQuerySchema = z.object({
  date: isoDateSchema,
  location: z.string().min(2),
});

export class BusinessDayController {
  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { from, to, location } = countQuerySchema.parse(req.query);

      if (from > to) {
        throw new BadRequestError('from must be before or equal to to', 'INVALID_DATE_RANGE');
      }

      const result = await businessDayService.countBusinessDays(from, to, location);

      res.json({
        status: 'success',
        data: result,
        meta: {
          from,
          to,
          location: result.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date, days, location } = addQuerySchema.parse(req.query);
      const result = await businessDayService.addBusinessDays(date, days, location);

      res.json({
        status: 'success',
        data: result,
        meta: {
          date,
          days,
          location: result.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async next(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date, location, includeCurrent } = nextQuerySchema.parse(req.query);
      const result = await businessDayService.nextBusinessDay(date, location, includeCurrent);

      res.json({
        status: 'success',
        data: result,
        meta: {
          date,
          location: result.location,
          includeCurrent,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async is(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date, location } = isQuerySchema.parse(req.query);
      const result = await businessDayService.isBusinessDay(date, location);

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
}

export const businessDayController = new BusinessDayController();
