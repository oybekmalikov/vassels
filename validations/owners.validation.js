const Joi = require("joi");
exports.ownersValidation = (body) => {
  const ownersValid = Joi.object({
    id: Joi.number().optional(),
    first_name: Joi.string().max(30).required().messages({
      "string.base": "Owner's first name was entered incorrectly",
      "string.max": "Owner's first name must be lower than 30 characters",
      "any.required": "Owner's first name is required",
    }),
    last_name: Joi.string().max(30).required().messages({
      "string.base": "Owner's last name was entered incorrectly",
      "string.max": "Owner's last name must be lower than 30 characters",
      "any.required": "Owner's last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Owner's email was entered incorrectly",
      "any.required": "Owner's email is required",
    }),
    password: Joi.string().min(8).max(100).required().messages({
      "string.base": "Password was entered incorrectly",
      "string.min": "Password must be greater than 7 characters",
      "string.max": "Password must be lower than 100 characters",
      "any.required": "Password is required",
    }),
    phone: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base":
          'Enter the phone number with correct format like "+998-90-123-45-67"',
        "any.required": "Owner's phone number is required",
      }),
    tax_id: Joi.string().required().messages({
      "string.base": "Owner's tax id was entered incorrectly",
      "any.required": "Owner's tax id is required",
    }),
    bank_card_number: Joi.string()
      .pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)
      .required()
      .messages({
        "string.pattern.base":
          'Enter the card number with correct format like "0000-0000-0000-0000"',
        "any.required": "Card number is required",
      }),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string().default("null").optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
  });
  return ownersValid.validate(body, { abortEarly: false });
};
