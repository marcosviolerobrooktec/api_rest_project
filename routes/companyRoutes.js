const express = require('express');
const {registerCompany,getCompanies,getCompanyById,getCompanyByName,getCompaniesByColor, getUsersCompany} = require('../controllers/companyController');
const { companyNameValidation, companyColorValidation, getCompanyValidation } = require('../middleware/validationCompany');
const { validate } = require('express-validation');
const { idValidation } = require('../middleware/validationUser');
const router = express.Router();

router.post('/',validate(companyNameValidation), registerCompany);
router.get('/', validate(getCompanyValidation),getCompanies);
router.get('/name', validate(companyNameValidation), getCompanyByName);
router.get('/color', validate(companyColorValidation), getCompaniesByColor);
router.get('/:id/users', validate(idValidation), getUsersCompany);
router.get('/:id', validate(idValidation), getCompanyById);

module.exports = router;