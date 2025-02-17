const express = require('express');
const dotenv = require('dotenv');
const {sequelize} = require('./config/config')
const routes = require('./routes/userRoutes')

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar Sequelize:', err);
});