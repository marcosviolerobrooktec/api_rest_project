const dotenv = require('dotenv');
dotenv.config();
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      freezeTableName: true,
    },
    auth: {
      secret: process.env.JWT_SECRET,
      expiresIn: '12h',
    },
  },
};
module.exports = config;