import { Router } from 'express';
import { locationController } from '@controllers/location.controller';

const router = Router();

/**
 * @route GET /api/v1/locations
 * @description Get locations with optional filters
 * @query type, state
 */
router.get('/', (req, res, next) => locationController.getLocations(req, res, next));

/**
 * @route GET /api/v1/locations/search
 * @description Search locations by name or code
 * @query q, limit
 */
router.get('/search', (req, res, next) => locationController.searchLocations(req, res, next));

/**
 * @route GET /api/v1/locations/states
 * @description Get all Brazilian states
 */
router.get('/states', (req, res, next) => locationController.getStates(req, res, next));

/**
 * @route GET /api/v1/locations/municipalities
 * @description Get municipalities, optionally filtered by state
 * @query state
 */
router.get('/municipalities', (req, res, next) => locationController.getMunicipalities(req, res, next));

/**
 * @route GET /api/v1/locations/code/:code
 * @description Get a specific location by code
 * @param code - Location code (e.g., 'SP', 'SP-SAO-PAULO')
 */
router.get('/code/:code', (req, res, next) => locationController.getLocationByCode(req, res, next));

/**
 * @route GET /api/v1/locations/:id
 * @description Get a specific location by ID
 * @param id - Location UUID
 */
router.get('/:id', (req, res, next) => locationController.getLocationById(req, res, next));

export default router;
