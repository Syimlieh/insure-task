require('dotenv').config();

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const dbConnect = require('./config/db/connect.db.js');
const logger = require('./utils/logger.utils.js');
const limiter = require('./middleware/rate-limiter.middleware.js');
const errorHandler = require('./middleware/errors/error-handler.error.js');
const { startMonitoring } = require('./utils/cpu-monitor.utils.js');

const PORT = process.env.PORT || 4000;

// Apply the rate limiter to all requests
app.use(limiter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database
dbConnect()
  .then(() => {
    logger.info('Database connected successfully');
  })
  .catch((err) => {
    logger.error('Failed to connect to the database', err);
  });

// Endpoints
require('./routes.js')(app);

app.get('/simulate-cpu', (req, res) => {
  const end = Date.now() + 10000;
  while (Date.now() < end) { 
    logger.info('looping...........')
  }
  res.send('CPU usage simulated!');
});

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// All the invalid routes which are not found are executed from here
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

app.use(errorHandler);

// Start CPU monitoring when the server starts
startMonitoring();

app.listen(PORT, () => {
  logger.info(`Backend Server running on PORT: ${PORT}`);
});
