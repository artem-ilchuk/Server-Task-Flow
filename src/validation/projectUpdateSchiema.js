import Joi from 'joi';

export const projectSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('', null).default(''),
  deadline: Joi.date().allow(null).default(null),
  img: Joi.string().allow(null, '').default(null),
  ownerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': 'Invalid Owner ID format' }),
});

export const projectUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(null, ''),
  status: Joi.string(),
  deadline: Joi.date().allow(null),
  img: Joi.string().allow(null),
}).min(1);
