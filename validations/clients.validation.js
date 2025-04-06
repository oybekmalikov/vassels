const Joi = require("joi");
exports.clientsValidation = (body) => {
  const clientsValid = Joi.object({
    first_name: Joi.string()
      .message("Client's first name was entered incorrectly")
      .max(30)
      .message("Client's first name must lower than 30 characters")
      .required()
      .message("Client's first name is required"),
    last_name: Joi.string()
      .message("Client's last name was entered incorrectly")
      .max(30)
      .message("Client's last name must lower than 30 characters")
      .required()
      .message("Client's last name is required"),
    email: Joi.string()
      .email()
      .message("Client's email was entered incorrectly")
      .required()
      .message("Client's email is required"),
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
      .message("Client's phone number is required"),
    passport_data: Joi.string()
      .pattern(/^[A-Z]{2}\d{7}$/)
      .message(
        `Enter the passport seria and number with correct format like "AA1234567"`
      )
      .required()
      .message("Client's passport seria and number is required"),
    passport_img_path: Joi.string()
      .message(`Passport img's path or url was entered incorrectly`)
      .required()
      .message(`Passport img's path or url is required`),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
  });
  return clientsValid.validate(body, { abortEarly: false });
};
