const express = require('express');
const {login} = require('../controllers/authController');
const { validate } = require('express-validation');
const { loginValidation} = require('../middleware/validationAuth');
const router = express.Router();

router.post('/login', validate(loginValidation), login);

module.exports = router;