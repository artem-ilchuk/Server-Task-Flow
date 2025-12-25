import Project from '../models/projectsSchiema.js';
import createHttpError from 'http-errors';

export const createProject = async ({ ownerId, payload }) => {
  return await Project.create({
    ownerId,
    ...payload,
  });
};

export const getProjectsByUser = async ({ ownerId, search = '' }) => {
  const query = { ownerId };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  return await Project.find(query).sort({ createdAt: -1 });
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
