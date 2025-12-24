import Task from '../models/taskSchiema.js';

export const createTask = async ({ ownerId, projectId, payload }) => {
  return await Task.create({
    ...payload,
    ownerId,
    projectId,
  });
};

export const getTasksByProject = async ({ ownerId, projectId }) => {
  return await Task.find({ ownerId, projectId });
};

export const getTaskById = async ({ ownerId, taskId }) => {
  return await Task.findOne({ _id: taskId, ownerId });
};

export const updateTask = async ({ ownerId, taskId, payload }) => {
  return await Task.findOneAndUpdate({ _id: taskId, ownerId }, payload, {
    new: true,
  });
};

export const deleteTask = async ({ ownerId, taskId }) => {
  return await Task.findOneAndDelete({ _id: taskId, ownerId });
};
