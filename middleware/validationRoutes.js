const { body, param, query, validationResult } = require('express-validator');

const validateRegister = [
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('password')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
      .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateLogin = [
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateEmail = [
    query('email').isEmail().withMessage('Correo electrónico inválido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateUpdateEmail = [
    param('id').isInt().withMessage('ID de usuario debe ser un número entero'),
    body('email').isEmail().withMessage('Correo electrónico inválido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateId = [
    param('id').isInt().withMessage('ID de usuario debe ser un número entero'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateEmail,
    validateEmail,
    validateId
  };
  
