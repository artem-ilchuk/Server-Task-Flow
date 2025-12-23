import Joi from 'joi';
import { VALID_STATUSES } from '../constants/index.js';

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  projectId: Joi.string().required(),
  status: Joi.string()
    .valid(...VALID_STATUSES)
    .default('todo'),
  deadline: Joi.date().allow(null),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid(...VALID_STATUSES),
  deadline: Joi.date().allow(null),
  order: Joi.number(),
});
