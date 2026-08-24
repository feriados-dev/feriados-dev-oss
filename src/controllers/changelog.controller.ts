import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { changelogService } from '@services/changelog.service';

const querySchema = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
  type: z.enum(['feature', 'improvement', 'fix', 'breaking', 'announcement']).optional(),
  since: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export class ChangelogController {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = querySchema.parse(req.query);
      const limit = Math.min(query.limit ?? 20, 100);
      const { entries, total } = changelogService.list({ ...query, limit });

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
      res.json({
        status: 'success',
        data: entries,
        meta: { total, limit, offset: query.offset ?? 0 },
      });
    } catch (error) {
      next(error);
    }
  }

  async rss(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const siteUrl = `${req.protocol}://${req.get('host')}`;
      const xml = changelogService.rss(siteUrl);
      res.set('Content-Type', 'application/rss+xml; charset=utf-8');
      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
      res.send(xml);
    } catch (error) {
      next(error);
    }
  }
}

export const changelogController = new ChangelogController();
