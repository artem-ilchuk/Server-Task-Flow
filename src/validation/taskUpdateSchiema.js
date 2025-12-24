import Joi from 'joi';
import { VALID_STATUSES } from '../constants/index.js';

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  projectId: Joi.string().required(),
  status: Joi.string()
    .valid(...VALID_STATUSES)
    .default('To Do'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  deadline: Joi.date().allow(null),
  assignedTo: Joi.string().hex().length(24).allow(null),
});
export const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid(...VALID_STATUSES),
  deadline: Joi.date().allow(null),
  order: Joi.number(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  assignedTo: Joi.string().hex().length(24).allow(null),
});
