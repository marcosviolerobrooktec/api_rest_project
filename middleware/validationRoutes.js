const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Correo electrónico inválido',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().min(6).pattern(/\d/).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.pattern.base': 'La contraseña debe contener al menos un número',
    'any.required': 'La contraseña es obligatoria'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Correo electrónico inválido',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Correo electrónico inválido',
    'any.required': 'El correo electrónico es obligatorio'
  })
});

const idSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'El ID debe ser un número entero',
    'any.required': 'El ID es obligatorio'
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  idSchema
};
