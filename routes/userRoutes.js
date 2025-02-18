const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, idSchema, emailSchema} = require('../middleware/validationRoutes');
const validateRequest = require('../middleware/validationSchema');
const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

router.get('/users', authenticateToken, getUsers);
router.get('/users/id/:id', validateRequest(idSchema, 'params'), getUserById);
router.get('/users/email', validateRequest(emailSchema, 'query'), getUserByEmail);

router.put('/users/:id', validateRequest(idSchema, 'params'), validateRequest(emailSchema, 'body'), authenticateToken, updateEmail);

router.delete('/users/:id', validateRequest(idSchema, 'params'), authenticateToken, deleteUser);

module.exports = router;