import { Router } from 'express';
import { impactEventController } from '@controllers/impactEvent.controller';

const router = Router();

router.get('/', (req, res, next) => impactEventController.searchImpactEvents(req, res, next));

router.get('/next', (req, res, next) =>
  impactEventController.getNextImpactEvents(req, res, next)
);

router.get('/:id', (req, res, next) => impactEventController.getImpactEventById(req, res, next));

export default router;
