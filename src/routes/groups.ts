import { Router } from 'express';
import groupsController from '../controllers/groupsController';

const router = Router();

router.get('/', groupsController.getAllGroups.bind(groupsController));

export default router;