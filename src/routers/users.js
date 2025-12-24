import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllUsers } from '../controllers/projects.js';

const router = Router();

router.get('/members/all', ctrlWrapper(getAllUsers));

export default router;
