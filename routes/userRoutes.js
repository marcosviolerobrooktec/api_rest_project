const express = require('express');
const { register, getUsers, getUserById, updateEmail, deleteUser, updateProfilePhoto, assignProjects} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validate } = require('express-validation');
const { registerValidation, idValidation, updateEmailValidation, getUsersValidation, assignProjectsValidation} = require('../middleware/validationUser');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();

router.post('/', validate(registerValidation), register);
router.post('/assignProjects', validate(assignProjectsValidation), authenticateToken, assignProjects);

router.get('/', validate(getUsersValidation), getUsers);
router.get('/:id', validate(idValidation), getUserById);

router.put('/:id', validate(updateEmailValidation), authenticateToken, updateEmail);

router.delete('/:id', validate(idValidation), authenticateToken, deleteUser);

router.post('/:id/photo', validate(idValidation), upload.single('profilePicture'), updateProfilePhoto);

module.exports = router;