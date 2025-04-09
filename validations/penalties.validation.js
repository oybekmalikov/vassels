const Joi = require("joi");
exports.penaltiesValidation = (body) => {
  const penaltiesValid = Joi.object({
    id: Joi.number(),
    reason: Joi.string()
      .valid("late return", "contract violation", "damage", "other")
      .required()
      .messages({
        "any.only": "Penalties reason was entered incorrectly",
        "any.required": "Penalties reason is required",
      }),
    penalty_cost: Joi.number().required().messages({
      "number.base": "Penalties cost was entered incorrectly",
      "any.required": "Penalties cost is required.",
    }),
    status: Joi.string()
      .valid("pending", "paid", "disputed")
      .required()
      .messages({
        "any.only": "Penalties status was entered incorrectly",
        "any.required": "Penalties status is required",
      }),
    description: Joi.string().optional(),
    clientId: Joi.number().required().messages({
      "number.base": "Penalties client id was entered incorrectly",
      "any.required": "Penalties client id is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Penalties vassel id was entered incorrectly",
      "any.required": "Penalties vassel id is required",
    }),
    bookingId: Joi.number().required().messages({
      "number.base": "Penalties booking id was entered incorrectly",
      "any.required": "Penalties booking id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return penaltiesValid.validate(body, { abortEarly: false });
};
