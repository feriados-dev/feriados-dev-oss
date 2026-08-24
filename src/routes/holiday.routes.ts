import { Router } from 'express';
import { holidayController } from '@controllers/holiday.controller';

const router = Router();

/**
 * @route GET /api/v1/holidays
 * @description Search holidays with filters
 * @query year, state, city, type, startDate, endDate, page, limit
 */
router.get('/', (req, res, next) => holidayController.searchHolidays(req, res, next));

/**
 * @route GET /api/v1/holidays/next
 * @description Get next upcoming holidays for a location
 * @query location, limit
 */
router.get('/next', (req, res, next) => holidayController.getNextHolidays(req, res, next));

/**
 * @route GET /api/v1/holidays/long-weekends
 * @description Get long weekends and bridge opportunities for a location
 * @query location, year
 */
router.get('/long-weekends', (req, res, next) => holidayController.getLongWeekends(req, res, next));

/**
 * @route GET /api/v1/holidays/is
 * @description Check whether a date is a holiday for a location
 * @query date, location
 */
router.get('/is', (req, res, next) => holidayController.isHoliday(req, res, next));

/**
 * @route GET /api/v1/holidays/compare
 * @description Compare holidays between locations
 * @query locations, year
 */
router.get('/compare', (req, res, next) => holidayController.compareHolidays(req, res, next));

/**
 * @route GET /api/v1/holidays/range
 * @description Get holidays in a date range
 * @query startDate, endDate
 */
router.get('/range', (req, res, next) => holidayController.getHolidaysByDateRange(req, res, next));

/**
 * @route GET /api/v1/holidays/year/:year
 * @description Get all holidays for a specific year
 * @param year - Year in YYYY format
 * @query state - Optional state filter
 */
router.get('/year/:year', (req, res, next) => holidayController.getHolidaysByYear(req, res, next));

/**
 * @route GET /api/v1/holidays/:id
 * @description Get a specific holiday by ID
 * @param id - Holiday UUID
 */
router.get(
  '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',
  (req, res, next) => holidayController.getHolidayById(req, res, next)
);

export default router;
