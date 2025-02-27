const express = require('express');
const {login} = require('../controllers/authController');
const {validate} = require('express-validation');
const {loginValidation} = require('../middleware/validationAuth');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Autentica a un usuario con su correo electrónico y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */

router.post('/login', validate(loginValidation), login);

module.exports = router;