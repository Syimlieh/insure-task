const logger = require('./logger.utils');

const formatResponse = (response, data = {}, status = 200) => {
  const isSuccessful = status < 300;

  const responseBody = {
    status,
    error: !isSuccessful,
    count: isSuccessful ? (Array.isArray(data) ? data.length : 1) : 0,
    issues: !isSuccessful ? (Array.isArray(data) ? data : [data]) : [],
    data: isSuccessful ? (Array.isArray(data) ? { items: data } : data) : {},
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
