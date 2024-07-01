const { formatResponse } = require('../utils/formatter.utils');
const Validations = require('./schema');

module.exports = function (validator, query = false, params = false) {
  if (!Object.prototype.hasOwnProperty.call(Validations, validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }

  return async function (req, res, next) {
    try {
      if (query && Object.keys(req.query).length) {
        await Validations[validator].validateAsync(req.query);
      } else if (params) {
        await Validations[validator].validateAsync(req.params);
      } else {
        const validated = await Validations[validator].validateAsync(req.body);
        req.body = validated;
      }
      next();
    } catch (err) {
      if (err.isJoi) {
        return formatResponse(res, { error: err.message }, 400);
      } else {
        return formatResponse(
          res,
          { error: 'Error while validating request' },
          400,
        );
      }
    }
  };
};
