import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  taskSchema,
  taskUpdateSchema,
} from '../validation/taskUpdateSchiema.js';
import {
  createTaskController,
  getTasksByProjectController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/tasks.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(taskSchema), ctrlWrapper(createTaskController));

router.get(
  '/project/:projectId',
  isValidId,
  ctrlWrapper(getTasksByProjectController),
);

router.get('/:taskId', isValidId, ctrlWrapper(getTaskByIdController));

router.patch(
  '/:taskId',
  isValidId,
  validateBody(taskUpdateSchema),
  ctrlWrapper(updateTaskController),
);

router.delete('/:taskId', isValidId, ctrlWrapper(deleteTaskController));

export default router;
