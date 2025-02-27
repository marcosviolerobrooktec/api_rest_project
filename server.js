const express = require('express');
const dotenv = require('dotenv');
const {sequelize} = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');


dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/public', express.static('public'));
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar Sequelize:', err);
});

module.exports = app;