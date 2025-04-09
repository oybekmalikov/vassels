const Joi = require("joi");
exports.vasselsValidation = (body) => {
  const vasselsValid = Joi.object({
    id: Joi.number(),
    model: Joi.string().max(100).required().messages({
      "string.base": "Vessel model name was entered incorrectly",
      "string.max": "Vessel model name must be lower than 100 characters",
      "any.required": "Vessel model name is required",
    }),
    capacity: Joi.number().required().messages({
      "number.base": "Capacity was entered incorrectly",
      "any.required": "Capacity is required",
    }),
    model_year: Joi.date().required().messages({
      "date.base": "Vessel's model year was entered incorrectly",
      "any.required": "Vessel's model year is required",
    }),
    size: Joi.number().required().messages({
      "number.base": "Vessel's size was entered incorrectly",
      "any.required": "Vessel's size is required",
    }),
    availability: Joi.boolean().default(false).messages({
      "boolean.base": "Vessel's availability was entered incorrectly",
    }),
    description: Joi.string().optional(),
    image_path: Joi.string().max(255).required().messages({
      "string.base": "Vessel image path was entered incorrectly",
      "string.max": "Vessel image path must be lower than 255 characters",
      "any.required": "Vessel image path is required",
    }),
    vasselsCategoryId: Joi.number().required().messages({
      "number.base": "Vessel category ID was entered incorrectly",
      "any.required": "Vessel category ID is required",
    }),
    ownerId: Joi.number().required().messages({
      "number.base": "Vessel owner ID was entered incorrectly",
      "any.required": "Vessel owner ID is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return vasselsValid.validate(body, { abortEarly: false });
};
