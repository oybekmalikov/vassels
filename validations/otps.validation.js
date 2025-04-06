const Joi = require("joi");
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
exports.otpsValidation = (body) => {
  const otpsValid = Joi.object({
    email: Joi.string()
      .email()
      .message("Opt's email was entered incorrectly")
      .required()
      .message("Otp's email is required"),
    otp: Joi.string()
      .message("otp was entered incorrectly")
      .required()
      .message("otp is required"),
    verified: Joi.boolean()
      .message(`Verified mest be "true" or "false"`)
      .default(false),
    expiration_time: Joi.string()
      .pattern(timeRegex)
      .message(
        `Enter the expiration time with correctly format like "HH:MM:SS" or "HH:MM"`
      )
      .required()
      .message("Expiration time is required"),
  });
  return otpsValid.validate(body, { abortEarly: false });
};
