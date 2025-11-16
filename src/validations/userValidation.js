const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(0).optional(),
  weight: Joi.number().min(0).optional(),
  height: Joi.number().min(0).optional()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(120).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  age: Joi.number().integer().min(0).optional(),
  weight: Joi.number().min(0).optional(),
  height: Joi.number().min(0).optional()
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
