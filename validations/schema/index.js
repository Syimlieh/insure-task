const { sortingPaginationValidation } = require('./general.validation');

const { tempMessageValidation } = require('./schedule-message.validation');

const { usernameValidation } = require('./policy.validation');

module.exports = {
  // General Pagination validation
  sortingPaginationValidation,

  // Temp message
  tempMessageValidation,

  // Policy
  usernameValidation,
};
