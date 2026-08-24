import { Request, Response, NextFunction } from 'express';
import { dataStatusService } from '@services/dataStatus.service';

export class DataStatusController {
  async status(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = await dataStatusService.getStatus();

      res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      res.json({
        status: 'success',
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dataStatusController = new DataStatusController();
