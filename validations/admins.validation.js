const Joi = require("joi");
exports.adminsValidation = (body) => {
  const adminsValid = Joi.object({
    full_name: Joi.string()
      .max(50)
      .message("Admin's full name must lower than 50 characters")
      .default("UnknownAdmin"),
    email: Joi.string()
      .email()
      .message("Admin's email was entered incorrectly")
      .required()
      .message("Admin's email is required"),
    password: Joi.string()
      .message("Password was entered incorrectly")
      .min(8)
      .message("Password must greater than 7 characters")
      .max(30)
      .message("Password must lower than 30 characters")
      .required()
      .message("Password is required"),
    role: Joi.string()
      .valid("ADMIN", "CREATOR")
      .message(
        `Admin's role was entered incorrectly (role can be "ADMIN" or "CREATOR")`
      )
      .required()
      .message("Admin's role is reqired"),
    is_active: Joi.boolean().default(false),
    refresh_token: Joi.string(),
  });
  return adminsValid.validate(body, { abortEarly: false });
};
