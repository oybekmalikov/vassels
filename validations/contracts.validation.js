const Joi = require("joi");
exports.contractsValidation = (body) => {
  const contractsValid = Joi.object({
    payment_receipt: Joi.string()
      .message("Payment receipt was entered incorrectly")
      .required()
      .message("Payment receipt is required"),
    terms: Joi.string()
      .message("Contract's term was entered incorrectly")
      .required()
      .message("Contract's term is required"),
    signed_date: Joi.date()
      .message(
        "The date the parties signed the contract was entered incorrectly"
      )
      .required()
      .message("The date the parties signed the contract must be entered"),
    payment_id: Joi.number()
      .message("Contract's payment id was entered incorrectly")
      .required()
      .message("Contract's payment id is required"),
    booking_id: Joi.number()
      .message("Contract's booking id was entered incorrectly")
      .required()
      .message("Contract's booking id is required"),
  });
  return contractsValid.validate(body, { abortEarly: false });
};
