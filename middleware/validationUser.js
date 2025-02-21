const { Joi } = require('express-validation');

const registerValidation = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).pattern(/\d/).required()
    })
  };

  const loginValidation = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
  };

  const idValidation = {
    params: Joi.object({
      id: Joi.number().integer()
    })
  };

  const emailQueryValidation = {
    query: Joi.object({
      email: Joi.string().email().required()
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
module.exports = {registerValidation,loginValidation,idValidation,emailQueryValidation,updateEmailValidation};