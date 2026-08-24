import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { calendarService } from '@services/calendar.service';

const monthQuerySchema = z.object({
  location: z.string().min(2),
  year: z.string().regex(/^\d{4}$/).transform(Number),
  month: z.string().regex(/^\d{1,2}$/).transform(Number).refine(
    value => value >= 1 && value <= 12,
    'month must be between 1 and 12'
  ),
});

export class CalendarController {
  async month(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { location, year, month } = monthQuerySchema.parse(req.query);
      const result = await calendarService.getMonth(location, year, month);

      res.json({
        status: 'success',
        data: result,
        meta: {
          year,
          month,
          location: result.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const calendarController = new CalendarController();
