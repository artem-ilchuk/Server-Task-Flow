import Task from '../models/taskSchiema.js';
import createHttpError from 'http-errors';

export const createTask = async ({ ownerId, projectId, payload }) => {
  return await Task.create({
    ownerId,
    projectId,
    ...payload,
  });
};

export const getTasksByProject = async ({ ownerId, projectId }) => {
  return await Task.find({ ownerId, projectId }).sort({
    order: 1,
    createdAt: 1,
  });
};

export const getTaskById = async ({ ownerId, taskId }) => {
  const task = await Task.findOne({ _id: taskId, ownerId });
  if (!task) throw createHttpError(404, 'Task not found');
  return task;
};

export const updateTask = async ({ ownerId, taskId, payload }) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, ownerId }, payload, {
    new: true,
  });
  if (!task) throw createHttpError(404, 'Task not found');
  return task;
};

export const deleteTask = async ({ ownerId, taskId }) => {
  const task = await Task.findOneAndDelete({ _id: taskId, ownerId });
  if (!task) throw createHttpError(404, 'Task not found');
  return task;
};
