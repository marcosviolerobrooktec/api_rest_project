const express = require('express');
const { register, login, getUsers, getUserById, getUserByEmail, updateEmail, deleteUser, updateProfilePhoto} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validate } = require('express-validation');
const { registerValidation,loginValidation, idValidation, emailQueryValidation, updateEmailValidation} = require('../middleware/validationUser');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();

router.post('/', validate(registerValidation), register);
router.post('/auth', validate(loginValidation), login);

router.get('/', getUsers);
router.get('/email', validate(emailQueryValidation), getUserByEmail);
router.get('/:id', validate(idValidation), getUserById);

router.put('/:id', validate(updateEmailValidation), authenticateToken, updateEmail);

router.delete('/:id', validate(idValidation), authenticateToken, deleteUser);

router.post('/:id/photo', validate(idValidation), upload.single('profilePicture'), updateProfilePhoto);

module.exports = router;