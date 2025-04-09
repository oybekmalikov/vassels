const Joi = require("joi");
exports.vasselsCategoriesValidation = (body) => {
  const vasselsCategoriesValid = Joi.object({
    id: Joi.number(),
    name: Joi.string().max(100).required().messages({
      "string.base": "Category name was entered incorrectly",
      "string.max": "Category name must be lower than 100 characters",
      "any.required": "Category name is required",
    }),
    description: Joi.string().optional(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return vasselsCategoriesValid.validate(body, { abortEarly: false });
};
