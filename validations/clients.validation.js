const Joi = require("joi");
exports.clientsValidation = (body) => {
  const clientsValid = Joi.object({
    id: Joi.number().optional(),
    first_name: Joi.string().max(30).required().messages({
      "string.base": "Client's first name was entered incorrectly",
      "string.max": "Client's first name must be lower than 30 characters",
      "any.required": "Client's first name is required",
    }),
    last_name: Joi.string().max(30).required().messages({
      "string.base": "Client's last name was entered incorrectly",
      "string.max": "Client's last name must be lower than 30 characters",
      "any.required": "Client's last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Client's email was entered incorrectly",
      "any.required": "Client's email is required",
    }),
    password: Joi.string().min(8).max(100).required().messages({
      "string.base": "Password was entered incorrectly",
      "string.min": "Password must be greater than 7 characters",
      "string.max": "Password must be lower than 30 characters",
      "any.required": "Password is required",
    }),
    phone: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": `Enter the phone number with correct format like "+998-90-123-45-67"`,
        "any.required": "Client's phone number is required",
      }),
    passport_data: Joi.string()
      .pattern(/^[A-Z]{2}\d{7}$/)
      .required()
      .messages({
        "string.pattern.base": `Enter the passport seria and number with correct format like "AA1234567"`,
        "any.required": "Client's passport seria and number is required",
      }),
    passport_img_path: Joi.string().required().messages({
      "string.base": `Passport img's path or url was entered incorrectly`,
      "any.required": `Passport img's path or url is required`,
    }),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string().default("null").optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  });
  return clientsValid.validate(body, { abortEarly: false });
};
