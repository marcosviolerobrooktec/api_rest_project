const { Joi } = require('express-validation');

const loginValidation = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
};

module.exports = {loginValidation};