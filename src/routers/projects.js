import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  projectSchema,
  projectUpdateSchema,
} from '../validation/projectUpdateSchiema.js';
import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
} from '../controllers/projects.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(projectSchema),
  ctrlWrapper(createProjectController),
);
router.get('/', ctrlWrapper(getProjectsController));
router.get('/:projectId', isValidId, ctrlWrapper(getProjectByIdController));
router.patch(
  '/:projectId',
  isValidId,
  validateBody(projectUpdateSchema),
  ctrlWrapper(updateProjectController),
);

router.delete('/:projectId', isValidId, ctrlWrapper(deleteProjectController));

export default router;
