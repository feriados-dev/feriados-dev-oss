import { Router } from 'express';
import holidayRoutes from './holiday.routes';
import locationRoutes from './location.routes';
import healthRoutes from './health.routes';
import changelogRoutes from './changelog.routes';
import businessDayRoutes from './businessDay.routes';
import calendarRoutes from './calendar.routes';
import dataStatusRoutes from './dataStatus.routes';
import impactEventRoutes from './impactEvent.routes';
import { changelogController } from '@controllers/changelog.controller';
import { holidayController } from '@controllers/holiday.controller';
import { config } from '@config/env';

const router = Router();

const API_PREFIX = `/${config.apiVersion}`;

router.use('/health', healthRoutes);

router.get(`${API_PREFIX}/holidays/ical`, (req, res, next) =>
  holidayController.getHolidaysIcal(req, res, next),
);

router.use(`${API_PREFIX}/holidays`, holidayRoutes);
router.use(`${API_PREFIX}/locations`, locationRoutes);
router.use(`${API_PREFIX}/business-days`, businessDayRoutes);
router.use(`${API_PREFIX}/calendar`, calendarRoutes);
router.use(`${API_PREFIX}/impact-events`, impactEventRoutes);

router.get(`${API_PREFIX}/changelog.rss`, (req, res, next) =>
  changelogController.rss(req, res, next),
);
router.use(`${API_PREFIX}/changelog`, changelogRoutes);
router.use(`${API_PREFIX}/data`, dataStatusRoutes);

router.get(API_PREFIX, (_req, res) => {
  res.json({
    status: 'success',
    message: 'feriados.dev OSS',
    version: config.apiVersion,
    documentation: '/api-docs',
    endpoints: {
      holidays: `${API_PREFIX}/holidays`,
      locations: `${API_PREFIX}/locations`,
      businessDays: `${API_PREFIX}/business-days`,
      calendar: `${API_PREFIX}/calendar`,
      impactEvents: `${API_PREFIX}/impact-events`,
      data: `${API_PREFIX}/data/status`,
      dataChangelog: `${API_PREFIX}/data/changelog`,
      changelog: `${API_PREFIX}/changelog`,
      health: '/health',
    },
  });
});

export default router;
