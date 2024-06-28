const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'InsuredMine App',
    description: 'Backend Application for InsuredMine App',
  },
  host: 'localhost:4000',
};

const outputFile = './swagger_output.json';
const routes = ['./routes'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./server.js');
});
