import Project from '../models/projectsSchiema.js';
import createHttpError from 'http-errors';

export const createProject = async ({ ownerId, payload }) => {
  return await Project.create({
    ownerId,
    ...payload,
  });
};

export const getProjectsByUser = async (ownerId) => {
  return await Project.find({ ownerId }).sort({ createdAt: -1 });
};

export const getProjectById = async ({ projectId, ownerId }) => {
  const project = await Project.findOne({ _id: projectId, ownerId });
  if (!project) throw createHttpError(404, 'Project not found');
  return project;
};

export const updateProject = async ({ projectId, ownerId, payload }) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, ownerId },
    payload,
    { new: true },
  );

  if (!project) throw createHttpError(404, 'Project not found');
  return project;
};

export const deleteProject = async ({ projectId, ownerId }) => {
  const project = await Project.findOneAndDelete({ _id: projectId, ownerId });

  if (!project) throw createHttpError(404, 'Project not found');
  return project;
};

export const getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ projectId })
    .populate('assignedTo', 'name avatar email')
    .sort({ order: 1 });

  res.status(200).json({
    status: 200,
    message: 'Tasks found',
    data: tasks,
  });
};
