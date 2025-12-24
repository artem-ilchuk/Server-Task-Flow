// src/controllers/tasks.js
export const createTaskController = async (req, res) => {
  res.status(200).json({
    message: 'IF_YOU_SEE_THIS_WE_WON',
    note: 'The file is finally updated',
  });
};

export const getTasksByProjectController = () => {};
export const getTaskByIdController = () => {};
export const updateTaskController = () => {};
export const deleteTaskController = () => {};
