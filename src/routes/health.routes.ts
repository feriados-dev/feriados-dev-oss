import { Router } from 'express';
import { healthController } from '@controllers/health.controller';

const router = Router();

/**
 * @route GET /health
 * @description General health check
 */
router.get('/', (req, res) => healthController.getHealth(req, res));

/**
 * @route GET /health/readiness
 * @description Kubernetes readiness probe
 */
router.get('/readiness', (req, res) => healthController.getReadiness(req, res));

/**
 * @route GET /health/liveness
 * @description Kubernetes liveness probe
 */
router.get('/liveness', (req, res) => healthController.getLiveness(req, res));

export default router;
