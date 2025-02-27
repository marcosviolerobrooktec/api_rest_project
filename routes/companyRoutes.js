const express = require('express');
const {registerCompany,getCompanies,getCompanyById, getUsersCompany} = require('../controllers/companyController');
const { companyNameValidation,getCompanyValidation } = require('../middleware/validationCompany');
const { validate } = require('express-validation');
const { idValidation } = require('../middleware/validationUser');
const router = express.Router();
/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nueva compañía
 *     description: Registra una nueva compañía en el sistema.
 *     tags:
 *       - Compañías
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Empresa ABC"
 *     responses:
 *       201:
 *         description: Compañía creada correctamente
 *       400:
 *         description: Compañía ya registrada
 *       500:
 *         description: Error interno del servidor
 *   get:
 *     summary: Obtiene una lista de compañías
 *     description: Retorna todas las compañías registradas.
 *     tags:
 *       - Compañías
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra compañías por nombre
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filtra compañías por color
 *     responses:
 *       200:
 *         description: Lista de compañías obtenida exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.post('/',validate(companyNameValidation), registerCompany);
router.get('/', validate(getCompanyValidation),getCompanies);
/**
 * @swagger
 * /companies/{id}/users:
 *   get:
 *     summary: Obtener los usuarios de una compañía
 *     description: Devuelve una lista de usuarios asociados a una compañía específica por su ID.
 *     tags:
 *       - Compañías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la compañía cuyos usuarios se desean obtener
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id/users', validate(idValidation), getUsersCompany);
/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Obtener detalles de una compañía
 *     description: Devuelve los detalles de una compañía específica por su ID.
 *     tags:
 *       - Compañías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la compañía que se desea obtener
 *     responses:
 *       200:
 *         description: Detalles de la compañía obtenidos correctamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validate(idValidation), getCompanyById);

module.exports = router;