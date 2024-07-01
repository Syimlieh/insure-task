const Joi = require('joi');

const usernameValidation = Joi.object({
  username: Joi.string().required().messages({
    'any.required': `Username is required.`,
  }),
});

module.exports = {
    usernameValidation,
};
