import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import projectsRouter from './projects.js';
import tasksRouter from './tasks.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);

export default router;
