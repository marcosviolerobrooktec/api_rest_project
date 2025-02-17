const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/users', getUsers);

router.get('/users/id/:id', getUserById);

router.get('/users/email', getUserByEmail);

router.put('/users/:id',authenticateToken,updateEmail);

router.delete('/users/:id',authenticateToken,deleteUser);

module.exports = router;