const Joi = require("joi");
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
exports.otpsValidation = (body) => {
  const otpsValid = Joi.object({
    otp: Joi.string().required().messages({
      "string.base": "OTP was entered incorrectly",
      "any.required": "OTP is required",
    }),
    verified: Joi.boolean().default(false).messages({
      "boolean.base": 'Verified must be "true" or "false"',
    }),
    expiration_time: Joi.string().pattern(timeRegex).required().messages({
      "string.pattern.base":
        'Enter the expiration time in correct format like "HH:MM:SS" or "HH:MM"',
      "any.required": "Expiration time is required",
    }),
  });
  return otpsValid.validate(body, { abortEarly: false });
};
