export const projectUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(null, ''),
  status: Joi.string(),
  deadline: Joi.date().allow(null),
  img: Joi.string().allow(null),
}).min(1);
