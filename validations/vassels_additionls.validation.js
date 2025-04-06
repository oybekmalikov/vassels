const Joi = require("joi");
exports.vasselsAdditionalsValidation = (body) => {
  const vasselsAdditionalsValid = Joi.object({
    attribute_name: Joi.string()
      .message("Attribute name was entered incorrectly")
      .max(100)
      .message("Attribute name must lower than 100 characters")
      .required()
      .message("Attribute name is required"),
    attribute_value: Joi.string()
      .message("Attribute value was entered incorrectly")
      .max(100)
      .message("Attribute value must lower than 100 characters")
      .required()
      .message("Attribute value is required"),
    vassel_id: Joi.number()
      .message("Vassels Additionals vassel id was entered incorrectly")
      .required()
      .message("Vassels Additionals vassel id is required"),
  });
  return vasselsAdditionalsValid.validate(body, { abortEarly: false });
};
