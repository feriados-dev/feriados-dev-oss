import { Router } from 'express';
import { changelogController } from '@controllers/changelog.controller';

const router = Router();

router.get('/', (req, res, next) => changelogController.list(req, res, next));

export default router;
