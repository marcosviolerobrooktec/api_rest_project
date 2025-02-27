const express = require('express');
const { register, getUsers, getUserById, updateEmail, deleteUser, updateProfilePhoto, assignProjects} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validate } = require('express-validation');
const { registerValidation, idValidation, updateEmailValidation, getUsersValidation, assignProjectsValidation} = require('../middleware/validationUser');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nuevo@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     description: Retorna todos los usuarios registrados en el sistema.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra usuarios por nombre
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtra usuarios por email
 *       - in: query
 *         name: companyIds
 *         schema:
 *           type: string
 *         description: Filtra usuarios por IDs de compañía
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         description: Filtra usuarios por ID de proyecto
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       404:
 *         description: No se encontraron usuarios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validate(registerValidation), register);
router.get('/', validate(getUsersValidation), getUsers);
router.post('/assignProjects', validate(assignProjectsValidation), authenticateToken, assignProjects);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna los datos de un usuario específico por su ID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualiza un usuario
 *     description: Actualiza los datos de un usuario específico.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "actualizado@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario específico por su ID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', validate(idValidation), getUserById);
router.put('/:id', validate(updateEmailValidation), authenticateToken, updateEmail);
router.delete('/:id', validate(idValidation), authenticateToken, deleteUser);
/**
 * @swagger
 * /users/{id}/photo:
 *   post:
 *     summary: Sube una foto de perfil
 *     description: Sube o actualiza la foto de perfil de un usuario específico.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario al que se le va a actualizar la foto
 *       - in: formData
 *         name: photo
 *         required: true
 *         type: file
 *         description: Archivo de imagen a subir como foto de perfil
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: Foto de perfil subida correctamente
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, formato de archivo no válido)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.post('/:id/photo', validate(idValidation), upload.single('profilePicture'), updateProfilePhoto);

module.exports = router;