const Joi = require("joi");
exports.paymnetsValidation = (body) => {
  const paymnetsValid = Joi.object({
    total_cost: Joi.number()
      .message("Payment's total cost was entered incorrectly")
      .required()
      .message("Payment's total cost is required."),
    payment_method: Joi.string()
      .valid("card", "cash", "bank_transfer", "other")
      .message("Payments's method was entered incorrectly")
      .required()
      .message("Payments's method is required"),
    status: Joi.string()
      .valid("pending", "canceled", "completed")
      .message("Payments's status was entered incorrectly")
      .required()
      .message("Payments's status is required"),
    client_id: Joi.number()
      .message("Payment's client id was entered incorrectly")
      .required()
      .message("Payment's client id is required"),
    owner_id: Joi.number()
      .message("Payment's owner id was entered incorrectly")
      .required()
      .message("Payment's owner id is required"),
    booking_id: Joi.number()
      .message("Payment's booking id was entered incorrectly")
      .required()
      .message("Payment's booking id is required"),
  });
  return paymnetsValid.validate(body, { abortEarly: false });
};
