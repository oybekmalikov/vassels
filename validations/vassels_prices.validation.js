const Joi = require("joi");
exports.vasselsPricesValidation = (body) => {
  const vasselsPricesValid = Joi.object({
    id: Joi.number(),
    duration: Joi.string()
      .valid("hourly", "daily", "weekly", "monthly", "yearly")
      .required()
      .messages({
        "any.only": "Duration was entered incorrectly",
        "any.required": "Duration is required",
        "string.base": "Duration must be a string",
      }),
    price: Joi.number().required().messages({
      "number.base": "Price was entered incorrectly",
      "any.required": "Price is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Vassel ID was entered incorrectly",
      "any.required": "Vassel ID is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return vasselsPricesValid.validate(body, { abortEarly: false });
};
