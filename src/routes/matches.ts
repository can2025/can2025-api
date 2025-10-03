import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get('/', matchesController.getAllMatches.bind(matchesController));

router.get('/upcoming', matchesController.getUpcomingMatches);
router.get('/knockout', matchesController.getKnockoutMatches);

export default router;