import { Router } from 'express';
import newsController from '../controllers/newsController';

const router = Router();

router.get('/', newsController.getLastNews.bind(newsController));

export default router;