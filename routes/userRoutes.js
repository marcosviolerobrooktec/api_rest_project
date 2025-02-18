const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser, updateProfilePhoto} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, idSchema, emailSchema} = require('../middleware/validationRoutes');
const validateRequest = require('../middleware/validationSchema');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();

router.post('/register', validateRequest(registerSchema, 'body'), register);
router.post('/login', validateRequest(loginSchema, 'body'), login);

router.get('/users', getUsers);
router.get('/users/id/:id', validateRequest(idSchema, 'params'), getUserById);
router.get('/users/email', validateRequest(emailSchema, 'query'), getUserByEmail);

router.put('/users/:id', validateRequest(idSchema, 'params'), validateRequest(emailSchema, 'body'), authenticateToken, updateEmail);

router.delete('/users/:id', validateRequest(idSchema, 'params'), authenticateToken, deleteUser);

router.post('/users/:id/photo', validateRequest(idSchema, 'params'), upload.single('profilePicture'), updateProfilePhoto);

module.exports = router;