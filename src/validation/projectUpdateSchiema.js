import Joi from 'joi';

export const projectSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('', null),
  deadline: Joi.date().allow(null),
  img: Joi.string().allow(null, ''),
  status: Joi.string().allow(null, ''),
});

export const projectUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(null, ''),
  status: Joi.string(),
  deadline: Joi.date().allow(null),
  img: Joi.string().allow(null),
}).min(1);
