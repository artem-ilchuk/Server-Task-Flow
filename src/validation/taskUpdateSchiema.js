import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('', null),
  status: Joi.string()
    .valid('TODO', 'IN_PROGRESS', 'ON_REVIEW', 'DONE')
    .required(),
  deadline: Joi.date().allow(null),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  projectId: Joi.string().required(),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().allow('', null),
  status: Joi.string().min(1).max(50).required(),
  deadline: Joi.date().allow(null),
  priority: Joi.string().valid('low', 'medium', 'high'),
  projectId: Joi.string(),
}).min(1);
