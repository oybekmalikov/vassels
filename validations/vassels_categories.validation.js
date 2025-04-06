const Joi = require("joi");
exports.vasselsCategoriesValidation = (body) => {
  const vasselsCategoriesValid = Joi.object({
    name: Joi.string()
      .message("Category name was entered incorrectly")
      .max(100)
      .message("Category name must lower than 100 characters")
      .required()
      .message("Category name is required"),
    description: Joi.string(),
  });
  return vasselsCategoriesValid.validate(body, { abortEarly: false });
};
