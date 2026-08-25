import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { impactEventService } from '@services/impactEvent.service';

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format')
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Invalid calendar date');

const impactEventQuerySchema = z.object({
  year: z.string().regex(/^\d{4}$/).transform(Number).optional(),
  country: z.string().regex(/^[A-Za-z]{2}$/).transform((value) => value.toUpperCase()).optional(),
  category: z
    .enum(['sports', 'civic', 'infrastructure', 'cultural', 'commerce', 'weather', 'other'])
    .optional(),
  impactLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  impactScope: z.enum(['national', 'state', 'municipality']).optional(),
  location: z.string().min(2).max(80).transform((value) => value.toUpperCase()).optional(),
  startDate: isoDateSchema.optional(),
  endDate: isoDateSchema.optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
}).refine((value) => value.page === undefined || value.page >= 1, {
  message: 'page must be greater than or equal to 1',
  path: ['page'],
}).refine((value) => value.limit === undefined || (value.limit >= 1 && value.limit <= 100), {
  message: 'limit must be between 1 and 100',
  path: ['limit'],
});

const nextImpactEventsQuerySchema = z.object({
  country: z.string().regex(/^[A-Za-z]{2}$/).transform((value) => value.toUpperCase()).default('BR'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('5'),
}).refine((value) => value.limit >= 1 && value.limit <= 100, {
  message: 'limit must be between 1 and 100',
  path: ['limit'],
});

export class ImpactEventController {
  async searchImpactEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = impactEventQuerySchema.parse(req.query);
      const result = await impactEventService.searchImpactEvents(params);

      res.json({
        status: 'success',
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async getNextImpactEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { country, limit } = nextImpactEventsQuerySchema.parse(req.query);
      const events = await impactEventService.getNextImpactEvents(limit, country);

      res.json({
        status: 'success',
        data: events,
        meta: {
          count: events.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getImpactEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const event = await impactEventService.getImpactEventById(id);

      res.json({
        status: 'success',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const impactEventController = new ImpactEventController();
