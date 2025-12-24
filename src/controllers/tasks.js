import {
  createTask,
  getTaskById,
  getTasksByProject,
  updateTask,
  deleteTask,
} from '../services/tasks.js';
import User from '../models/userSchema.js';

export const createTaskController = async (req, res) => {
  if (!req.user) {
    console.error('DEBUG: req.user is MISSING');
    return res.status(401).json({ message: 'User context lost' });
  }

  console.log('DEBUG: User ID:', req.user._id);
  console.log('DEBUG: Body:', req.body);

  try {
    const ownerId = req.user._id;
    const { projectId, ...payload } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'projectId is required' });
    }

    const task = await createTask({ ownerId, projectId, payload });

    res.status(201).json({
      status: 201,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('DEBUG: Service Error:', error.message);
    res.status(500).json({
      message: 'Server Error during task creation',
      error: error.message,
    });
  }
};

export const getTasksByProjectController = async (req, res) => {
  const ownerId = req.user._id;
  const projectId = req.params.projectId;

  const tasks = await getTasksByProject({ ownerId, projectId });

  res.status(200).json({
    status: 200,
    data: tasks,
  });
};

export const getTaskByIdController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;

  const task = await getTaskById({ ownerId, taskId });

  res.status(200).json({
    status: 200,
    data: task,
  });
};

export const updateTaskController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;
  const payload = req.body;

  const task = await updateTask({ ownerId, taskId, payload });

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: task,
  });
};

export const deleteTaskController = async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.taskId;

  await deleteTask({ ownerId, taskId });

  res.status(204).send();
};
