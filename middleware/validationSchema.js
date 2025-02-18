const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
      const { error } = schema.validate(req[property], { abortEarly: false });
  
      if (error) {
        return res.status(400).json({
          errors: error.details.map(err => ({
            message: err.message,
            field: err.path[0]
          }))
        });
      }
      
      next();
    };
  };
  
  module.exports = validateRequest;