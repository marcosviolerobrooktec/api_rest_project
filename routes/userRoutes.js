const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, validateId, validateEmail, validateUpdateEmail } = require('../middleware/validationRoutes');
const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);

router.get('/users', getUsers);

router.get('/users/id/:id', validateId, getUserById);

router.get('/users/email', validateEmail, getUserByEmail);

router.put('/users/:id', validateUpdateEmail, authenticateToken,updateEmail);

router.delete('/users/:id', validateId, authenticateToken,deleteUser);

module.exports = router;