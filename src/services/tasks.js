import Task from '../models/taskSchema.js';

export const createTask = async ({ ownerId, projectId, payload }) => {
  return await Task.create({
    ...payload,
    ownerId,
    projectId,
  });
};

export const getTasksByProject = async ({
  ownerId,
  projectId,
  filters = {},
}) => {
  const { search, priority, status } = filters;

  const query = { ownerId, projectId };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (priority && priority !== 'all') {
    query.priority = priority;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  return await Task.find(query).sort({ createdAt: -1 });
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
