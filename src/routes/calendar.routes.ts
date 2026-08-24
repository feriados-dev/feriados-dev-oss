import { Router } from 'express';
import { calendarController } from '@controllers/calendar.controller';

const router = Router();

router.get('/month', (req, res, next) => calendarController.month(req, res, next));

export default router;
