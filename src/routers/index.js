import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import projectsRouter from './projects.js';
import tasksRouter from './tasks.js';
import membersRouter from './users.js';
import notificationsRouter from './notifications.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);
router.use('/members', membersRouter);
router.use('/notifications', notificationsRouter);

export default router;
