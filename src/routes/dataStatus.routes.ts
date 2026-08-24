import { Router } from 'express';
import { dataStatusController } from '@controllers/dataStatus.controller';
import { dataChangelogController } from '@controllers/dataChangelog.controller';

const router = Router();

router.get('/status', (req, res, next) => dataStatusController.status(req, res, next));
router.get('/changelog.rss', (req, res, next) => dataChangelogController.rss(req, res, next));
router.get('/changelog', (req, res, next) => dataChangelogController.list(req, res, next));

export default router;
