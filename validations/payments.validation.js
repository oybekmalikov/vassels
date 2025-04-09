const Joi = require("joi");
exports.paymentsValidation = (body) => {
  const paymentsValid = Joi.object({
    id: Joi.number(),
    total_cost: Joi.number().required().messages({
      "number.base": "Payment's total cost was entered incorrectly",
      "any.required": "Payment's total cost is required.",
    }),
    payment_method: Joi.string()
      .valid("card", "cash", "bank_transfer", "other")
      .required()
      .messages({
        "any.only": "Payment's method was entered incorrectly",
        "any.required": "Payment's method is required",
        "string.base": "Payment's method must be a string",
      }),
    status: Joi.string()
      .valid("pending", "canceled", "completed")
      .required()
      .messages({
        "any.only": "Payment's status was entered incorrectly",
        "any.required": "Payment's status is required",
        "string.base": "Payment's status must be a string",
      }),
    clientId: Joi.number().required().messages({
      "number.base": "Payment's client id was entered incorrectly",
      "any.required": "Payment's client id is required",
    }),
    ownerId: Joi.number().required().messages({
      "number.base": "Payment's owner id was entered incorrectly",
      "any.required": "Payment's owner id is required",
    }),
    bookingId: Joi.number().required().messages({
      "number.base": "Payment's booking id was entered incorrectly",
      "any.required": "Payment's booking id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return paymentsValid.validate(body, { abortEarly: false });
};
