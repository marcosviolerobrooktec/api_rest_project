const express = require('express');
const dotenv = require('dotenv');
const {sequelize} = require('./models/index')
const routes = require('./routes/userRoutes')

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT;

app.use('/public', express.static('public'));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar Sequelize:', err);
});