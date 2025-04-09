const Joi = require("joi");
exports.adminsValidation = (body) => {
  const adminsValid = Joi.object({
    id: Joi.number(),
    full_name: Joi.string().max(50).default("UnknownAdmin").messages({
      "string.max": "Admin's full name must be lower than 50 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Admin's email was entered incorrectly",
      "any.required": "Admin's email is required",
    }),
    password: Joi.string().min(8).max(100).required().messages({
      "string.min": "Password must be greater than 7 characters",
      "string.max": "Password must be lower than 100 characters",
      "any.required": "Password is required",
    }),
    is_creator: Joi.boolean().default(false).optional(),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string().default("null").optional(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return adminsValid.validate(body, { abortEarly: false });
};
