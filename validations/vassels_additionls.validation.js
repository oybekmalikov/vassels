const Joi = require("joi");
exports.vasselsAdditionalsValidation = (body) => {
  const vasselsAdditionalsValid = Joi.object({
    id: Joi.number(),
    attribute_name: Joi.string().max(100).required().messages({
      "string.base": "Attribute name was entered incorrectly",
      "string.max": "Attribute name must be lower than 100 characters",
      "any.required": "Attribute name is required",
    }),
    attribute_value: Joi.string().max(100).required().messages({
      "string.base": "Attribute value was entered incorrectly",
      "string.max": "Attribute value must be lower than 100 characters",
      "any.required": "Attribute value is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Vassels Additionals vassel id was entered incorrectly",
      "any.required": "Vassels Additionals vassel id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return vasselsAdditionalsValid.validate(body, { abortEarly: false });
};
