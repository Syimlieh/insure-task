const logger = require('./logger.utils');

const statusMessage = {
  200: 'ok',
  204: 'Successfully logout',
  400: 'There are some missing or invalid values in your request.',
  401: 'Your token have expired or you are unauthorized',
  403: "You don't have permission to access this site.",
  404: 'Resource not found',
  500: 'Something went wrong. Please try again later',
  502: 'Database connection failed',
};

const formatResponse = (response, data = {}, status = 200) => {
  const isSuccessful = status < 300;

  const responseBody = {
    status,
    error: !isSuccessful,
    count: isSuccessful ? (Array.isArray(data) ? data.length : 1) : 0,
    issues: !isSuccessful ? (Array.isArray(data) ? data : [data]) : [],
    data: isSuccessful ? (Array.isArray(data) ? { items: data } : data) : {},
    message: statusMessage[status] || '',
  };

  if (isSuccessful) {
    logger.info(
      `API: ${response.req.path} | STATUS: ${status} | LENGTH: ${responseBody.count}`,
    );
  } else {
    logger.error(
      `API: ${response.req.path} | STATUS: ${status} | Reason: ${JSON.stringify(responseBody.issues)}`,
    );
  }

  response.status(status).json(responseBody);
};

module.exports = {
  formatResponse,
};
