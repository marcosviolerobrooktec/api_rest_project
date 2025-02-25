const { Joi } = require('express-validation');

const registerValidation = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).pattern(/\d/).required()
    })
  };

  const idValidation = {
    params: Joi.object({
      id: Joi.number().integer().required()
    })
  };

  const updateEmailValidation = {
    params: Joi.object({
      id: Joi.number().integer().required()
    }),
    body: Joi.object({
      email: Joi.string().email().required()
    })
  };

  const getUsersValidation = {
    query: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      companyIds: Joi.array().items(Joi.number()).optional()
    })
  };
module.exports = {registerValidation,idValidation,updateEmailValidation,getUsersValidation};