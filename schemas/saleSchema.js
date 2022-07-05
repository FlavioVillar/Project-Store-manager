const Joi = require('joi');

const saleSchema = Joi.array().items(
  Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().required().min(1).messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
  }),
);

//   Joi.object({
//   productId: Joi.number().required().messages({
//     'any.required': '"productId" is required',
//   }),
//   quantity: Joi.number().required().min(1).messages({
//     'any.required': '"quantity" is required',
//     'number.min': '"quantity" must be greater than or equal to 1',
//   }),
// });

module.exports = saleSchema;