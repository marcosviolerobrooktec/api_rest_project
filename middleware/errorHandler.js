const { ValidationError } = require('express-validation');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json({
    message: 'Error interno del servidor'
  });
};

module.exports = errorHandler;