import {
  createProject,
  updateProject,
  getProjectsByUser,
  getProjectById,
  deleteProject,
} from '../services/projects.js';
import User from '../models/userSchema.js';

export const createProjectController = async (req, res) => {
  const project = await createProject({
    ownerId: req.user._id,
    payload: req.body,
  });

  res.status(201).json({ status: 201, data: project });
};

export const getProjectsController = async (req, res) => {
  const ownerId = req.user._id;

  const { search } = req.query;

  const projects = await getProjectsByUser({ ownerId, search });

  res.status(200).json({
    status: 200,
    data: projects,
  });
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

export const getAllUsers = async (req, res) => {
  const users = await User.find({}, '_id name email avatar');

  res.status(200).json({
    status: 200,
    message: 'Successfully found users',
    data: users,
  });
};
