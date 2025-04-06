const Joi = require("joi");
exports.ownersValidation = (body) => {
  const ownersValid = Joi.object({
    first_name: Joi.string()
      .message("Owner's first name was entered incorrectly")
      .max(30)
      .message("Client's first name must lower than 30 characters")
      .required()
      .message("Owner's first name is required"),
    last_name: Joi.string()
      .message("Owner's last name was entered incorrectly")
      .max(30)
      .message("Owner's last name must lower than 30 characters")
      .required()
      .message("Owner's last name is required"),
    email: Joi.string()
      .email()
      .message("Owner's email was entered incorrectly")
      .required()
      .message("Owner's email is required"),
    password: Joi.string()
      .message("Password was entered incorrectly")
      .min(8)
      .message("Password must greater than 7 characters")
      .max(30)
      .message("Password must lower than 30 characters")
      .required()
      .message("Password is required"),
    phone: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .message(
        `Enter the phone number with correct format like "+998-90-123-45-67"`
      )
      .required()
      .message("Owner's phone number is required"),
    tax_id: Joi.string()
      .message("Owner's tax id was entered incorrectly")
      .required()
      .message("Owner's tax id is required"),
    bank_card_number: Joi.string()
      .pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)
      .message(
        `Enter the card number with correct format like "0000-0000-0000-0000" `
      )
      .required()
      .message("Card number is required"),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
  });
  return ownersValid.validate(body, { abortEarly: false });
};
