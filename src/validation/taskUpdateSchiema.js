import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  // Валидируем projectId как строку (ObjectId)
  projectId: Joi.string().required(),
  status: Joi.string()
    .valid('TO DO', 'IN PROGRESS', 'ON REVIEW', 'DONE')
    .default('TO DO'),
  deadline: Joi.date().allow(null),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('TO DO', 'IN PROGRESS', 'ON REVIEW', 'DONE'),
  deadline: Joi.date().allow(null),
  order: Joi.number(),
});
