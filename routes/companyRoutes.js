const express = require('express');
const {registerCompany,getCompanies,getCompanyById, getUsersCompany} = require('../controllers/companyController');
const { companyNameValidation,getCompanyValidation } = require('../middleware/validationCompany');
const { validate } = require('express-validation');
const { idValidation } = require('../middleware/validationUser');
const router = express.Router();

router.post('/',validate(companyNameValidation), registerCompany);

router.get('/', validate(getCompanyValidation),getCompanies);
router.get('/:id/users', validate(idValidation), getUsersCompany);
router.get('/:id', validate(idValidation), getCompanyById);

module.exports = router;