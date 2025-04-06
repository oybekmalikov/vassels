const Joi = require("joi");
exports.penaltiesValidation = (body) => {
  const penaltiesValid = Joi.object({
    reason: Joi.string()
      .valid("late return", "contract violation", "damage", "other")
      .message("Penalties reason was entered incorrectly")
      .required()
      .message("Penalties reason is required"),
    penalty_cost: Joi.number()
      .message("Penalties cost was entered incorrectly")
      .required()
      .message("Penalties cost is required."),
    status: Joi.string()
      .valid("pending", "paid", "disputed")
      .message("Penalties status was entered incorrectly")
      .required()
      .message("Penalties status is required"),
    description: Joi.string(),
    client_id: Joi.number()
      .message("Penalties client id was entered incorrectly")
      .required()
      .message("Penalties client id is required"),
    vassel_id: Joi.number()
      .message("Penalties vassel id was entered incorrectly")
      .required()
      .message("Penalties vassel id is required"),
    booking_id: Joi.number()
      .message("Penalties booking id was entered incorrectly")
      .required()
      .message("Penalties booking id is required"),
  });
  return penaltiesValid.validate(body, { abortEarly: false });
};
