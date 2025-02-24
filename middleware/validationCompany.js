const { Joi } = require('express-validation');

const companyNameValidation = {
    query: Joi.object({
        name: Joi.string().required()
      })
  };

  const getCompanyValidation = {
    query: Joi.object({
      name: Joi.string().optional()
    })
  };

  const companyColorValidation = {
    query: Joi.object({
      color: Joi.string()
        .pattern(/^#[0-9A-F]{6}$/i).required()
    })
  };

  const idValidation = {
    params: Joi.object({
      id: Joi.number().integer()
    })
  };
  
  module.exports = {companyNameValidation,companyColorValidation,idValidation,getCompanyValidation};