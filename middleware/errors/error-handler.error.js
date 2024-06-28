const logger = require('../../utils/logger.utils');

const errorHandler = (err, req, res) => {
  // Log the error with Winston or any logging mechanism
  logger.error(err.message, { metadata: err });

  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'MongoError') {
    // MongoDB specific error handling
    statusCode = 500; // Internal Server Error for MongoDB errors
    message = 'MongoDB Error';
  } else if (err.name === 'ValidationError') {
    // Validation errors handling (example)
    statusCode = 400; // Bad Request for validation errors
    message = err.message || 'Validation Error';
  }
  // Add more conditions for other specific error types here

  // Send JSON response
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      statusCode,
      message,
    },
  });
};

module.exports = errorHandler;
