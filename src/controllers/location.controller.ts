import { Request, Response, NextFunction } from 'express';
import { locationService } from '@services/location.service';
import { z } from 'zod';

const locationQuerySchema = z.object({
  type: z.enum(['country', 'state', 'municipality']).optional(),
  state: z.string().length(2).optional(),
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('50'),
});

const searchQuerySchema = z.object({
  q: z.string().min(2),
  limit: z.string().transform(Number).default('20'),
});

export class LocationController {
  async getLocationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const location = await locationService.getLocationById(id);

      res.json({
        status: 'success',
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLocationByCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = req.params;
      const location = await locationService.getLocationByCode(code);

      res.json({
        status: 'success',
        data: location,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type, state, page, limit } = locationQuerySchema.parse(req.query);

      const result = await locationService.getLocations({
        type,
        state,
        page,
        limit,
      });

      res.json({
        status: 'success',
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async searchLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, limit } = searchQuerySchema.parse(req.query);

      const locations = await locationService.searchLocations(
        q,
        typeof limit === 'string' ? parseInt(limit) : limit
      );

      res.json({
        status: 'success',
        data: locations,
        meta: {
          query: q,
          count: locations.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getStates(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const states = await locationService.getStates();

      res.json({
        status: 'success',
        data: states,
        meta: {
          count: states.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMunicipalities(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { state } = req.query;

      const municipalities = await locationService.getMunicipalities(state as string | undefined);

      res.json({
        status: 'success',
        data: municipalities,
        meta: {
          state: state || 'all',
          count: municipalities.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const locationController = new LocationController();
