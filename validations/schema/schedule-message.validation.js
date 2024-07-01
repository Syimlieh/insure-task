const Joi = require('joi');
const { REGEX } = require('../../utils/constants.utils');

const tempMessageValidation = Joi.object({
  message: Joi.string().required(),
  day: Joi.string()
    .pattern(REGEX.DAY_FORMAT) 
    .required()
    .messages({
      'string.pattern.base': `Day must be in the format YYYY-MM-DD`,
      'string.empty': `Day cannot be empty`,
      'any.required': `Day is required.`,
    }),
  time: Joi.string()
    .pattern(REGEX.TIME_FORMAT)
    .required()
    .messages({
      'string.pattern.base': `Time must be in the format HH:mm:ss`,
      'string.empty': `Time cannot be empty`,
      'any.required': `Time is required.`,
    }),
});

module.exports = {
  tempMessageValidation,
};
