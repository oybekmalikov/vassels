const Joi = require("joi");
exports.vasselsPricesValidation = (body) => {
  const vasselsPricesValid = Joi.object({
    duration: Joi.string()
      .valid("hourly", "daily", "weekly", "monthly", "yearly")
      .message("Duration was entered incorrectly")
      .required()
      .message("Duration name is required"),
    price: Joi.number()
      .message("Price was entered incorrectly")
      .required()
      .message("Price is required."),
    vassel_id: Joi.number()
      .message("Vassel Prices vassel id was entered incorrectly")
      .required()
      .message("Vassel Prices vassel id is required"),
  });
  return vasselsPricesValid.validate(body, { abortEarly: false });
};
