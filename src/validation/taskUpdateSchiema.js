export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  projectId: Joi.string().required(),
  status: Joi.string()
    .valid(...VALID_STATUSES)
    .default('To Do'),
  deadline: Joi.date().allow(null),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid(...VALID_STATUSES),
  deadline: Joi.date().allow(null),
  order: Joi.number(),
  priority: Joi.string().valid('low', 'medium', 'high'),
});
