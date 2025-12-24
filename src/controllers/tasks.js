import createHttpError from 'http-errors';
import {
  createTask,
  getTaskById,
  getTasksByProject,
  updateTask,
  deleteTask,
} from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  // Проверяем наличие пользователя без деструктуризации аргументов
  if (!req || !req.user) {
    throw createHttpError(
      401,
      'User not found in request context. Check middleware chain.',
    );
  }

  try {
    const ownerId = req.user._id;
    const { projectId, ...payload } = req.body;

    if (!projectId) {
      throw createHttpError(400, 'projectId is required');
    }

    const task = await createTask({
      ownerId,
      projectId,
      payload,
    });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    // Если это ошибка Mongoose или сервиса, пробрасываем её дальше в ctrlWrapper
    throw error;
  }
};

export const getTasksByProjectController = async (req, res) => {
  const ownerId = req.user._id;
  const projectId = req.params.projectId;
  const tasks = await getTasksByProject({ ownerId, projectId });
  res.status(200).json({ status: 200, data: tasks });
};

export const getTaskByIdController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;
  const task = await getTaskById({ ownerId, taskId });
  res.status(200).json({ status: 200, data: task });
};

export const updateTaskController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;
  const payload = req.body;
  const task = await updateTask({ ownerId, taskId, payload });
  res
    .status(200)
    .json({ status: 200, message: 'Task updated successfully', data: task });
};

export const deleteTaskController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;
  await deleteTask({ ownerId, taskId });
  res.status(204).send();
};
