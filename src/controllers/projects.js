import {
  createProject,
  updateProject,
  getProjectsByUser,
  getProjectById,
  deleteProject,
} from '../services/projects.js';
export const createProjectController = async (req, res) => {
  const project = await createProject({
    ownerId: req.user._id,
    payload: req.body,
  });

  res.status(201).json({ status: 201, data: project });
};

export const getProjectsController = async (req, res) => {
  const projects = await getProjectsByUser(req.user._id);

  res.json({ status: 200, data: projects });
};

export const getProjectByIdController = async (req, res) => {
  const project = await getProjectById({
    projectId: req.params.projectId,
    ownerId: req.user._id,
  });

  res.json({ status: 200, data: project });
};

export const updateProjectController = async (req, res) => {
  const project = await updateProject({
    projectId: req.params.projectId,
    ownerId: req.user._id,
    payload: req.body,
  });

  res.json({ status: 200, data: project });
};

export const deleteProjectController = async (req, res) => {
  await deleteProject({
    projectId: req.params.projectId,
    ownerId: req.user._id,
  });

  res.status(204).send();
};
