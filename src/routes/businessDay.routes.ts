import { Router } from 'express';
import { businessDayController } from '@controllers/businessDay.controller';

const router = Router();

router.get('/', (req, res, next) => businessDayController.count(req, res, next));
router.get('/add', (req, res, next) => businessDayController.add(req, res, next));
router.get('/next', (req, res, next) => businessDayController.next(req, res, next));
router.get('/is', (req, res, next) => businessDayController.is(req, res, next));

export default router;
