import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getLatestNotification } from '../controllers/notifications.js';

const router = Router();
router.get('/latest', authenticate, getLatestNotification);

export default router;
