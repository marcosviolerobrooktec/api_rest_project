const swaggerAutogen = require('swagger-autogen')();
const path = require('path');
const fs = require('fs');

const outputFile = path.join(__dirname, 'swagger-output.json');

const routesFolder = path.join(__dirname, '..', 'routes');
const endpointsFiles = [];

fs.readdirSync(routesFolder).forEach(file => {endpointsFiles.push(path.join(routesFolder, file));});

const options = {
  info: {
    title: 'Mi API',
    description: 'Documentación generada automáticamente con swagger-autogen',
    version: '1.0.0',
  },
  host: 'localhost:5000', 
  schemes: ['http'], 
  basePath: '/api'
};

swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
  console.log('Swagger documentation generated');
});