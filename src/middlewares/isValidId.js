import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { projectId, taskId } = req.params;
  const id = projectId || taskId;

  if (id && !isValidObjectId(id)) {
    return next(
      createHttpError(
        400,
        `Bad Request. The ID "${id}" is invalid. Please double-check it.`,
      ),
    );
  }

  next();
};
