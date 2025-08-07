import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const router = Router();

router.get('/', matchesController.getAllMatches.bind(matchesController));

router.get('/upcoming', matchesController.getUpcomingMatches);

export default router;