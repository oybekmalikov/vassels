const Joi = require("joi");
exports.vasselsValidation = (body) => {
  const vasselsValid = Joi.object({
    model: Joi.string()
      .message("Vasels model name was entered incorrectly")
      .max(100)
      .message("Vasels model name is lower than 100 character")
      .required()
      .message("Vasels model name is required"),
    capacity: Joi.number()
      .message("Capacity was entered incorrectly")
      .required()
      .message("Capacity is required."),
    model_year: Joi.date()
      .message("Vassel's model year was entered incorrectly")
      .required()
      .message("Vassel's model year is required"),
    size: Joi.number()
      .message("Vassel's size was entered incorrectly")
      .required()
      .message("Vassel's size is required."),
    availability: Joi.boolean()
      .message("Vassel's availability was entered incorrectly")
      .default(false),
    description: Joi.string(),
    image_path: Joi.string()
      .message("Vasels imgage path was entered incorrectly")
      .max(255)
      .message("Vasels imgage path is lower than 255 character")
      .required()
      .message("Vasels imgage path is required"),
    category_id: Joi.number()
      .message("Vassel category id was entered incorrectly")
      .required()
      .message("Vassel category id is required"),
    owner_id: Joi.number()
      .message("Vassel owner id was entered incorrectly")
      .required()
      .message("Vassel owner id is required"),
  });
  return vasselsValid.validate(body, { abortEarly: false });
};
