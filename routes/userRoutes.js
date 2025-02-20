const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser, updateProfilePhoto, getCompanies, getCompanyById, getCompanyByName, getCompaniesByColor, registerCompany} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, idSchema, emailSchema, companyNameSchema, companyColorSchema} = require('../middleware/validationRoutes');
const validateRequest = require('../middleware/validationSchema');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();

router.post('/register', validateRequest(registerSchema, 'body'), register);
router.post('/register/company',validateRequest(companyNameSchema, 'body'), registerCompany);
router.post('/login', validateRequest(loginSchema, 'body'), login);

router.get('/users', getUsers);
router.get('/companies', getCompanies);
router.get('/users/id/:id', validateRequest(idSchema, 'params'), getUserById);
router.get('/users/email', validateRequest(emailSchema, 'query'), getUserByEmail);
router.get('/company/id/:id', validateRequest(idSchema, 'params'), getCompanyById);
router.get('/company/name', validateRequest(companyNameSchema, 'query'), getCompanyByName);
router.get('/companies/color', validateRequest(companyColorSchema, 'query'), getCompaniesByColor);

router.put('/users/:id', validateRequest(idSchema, 'params'), validateRequest(emailSchema, 'body'), authenticateToken, updateEmail);

router.delete('/users/:id', validateRequest(idSchema, 'params'), authenticateToken, deleteUser);

router.post('/users/:id/photo', validateRequest(idSchema, 'params'), upload.single('profilePicture'), updateProfilePhoto);

module.exports = router;