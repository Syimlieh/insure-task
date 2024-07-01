const ACCOUNT_TYPE = {
  PERSONAL: 'Personal',
  COMMERCIAL: 'Commercial',
};

const POLICY_TYPE = {
  SINGLE: 'Single',
  PACKAGE: 'Package',
};

const REGEX = {
  DAY_FORMAT: /^\d{4}-\d{2}-\d{2}$/,   // format YYYY-MM-DD
  TIME_FORMAT: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,  //  format HH:mm:ss
};

module.exports = {
  ACCOUNT_TYPE,
  POLICY_TYPE,
  REGEX,
};
