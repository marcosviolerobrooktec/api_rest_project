const express = require('express');
const {registerCompany,getCompanies,getCompanyById,getCompanyByName,getCompaniesByColor} = require('../controllers/companyController');
const { companyNameValidation, companyColorValidation } = require('../middleware/validationCompany');
const { validate } = require('express-validation');
const { idValidation } = require('../middleware/validationUser');
const router = express.Router();

router.post('/',validate(companyNameValidation), registerCompany);
router.get('/', getCompanies);
router.get('/name', validate(companyNameValidation), getCompanyByName);
router.get('/color', validate(companyColorValidation), getCompaniesByColor);
router.get('/:id', validate(idValidation), getCompanyById);

module.exports = router;