const Joi = require("joi");
exports.contractsValidation = (body) => {
  const contractsValid = Joi.object({
    id: Joi.number(),
    payment_receipt: Joi.string().required().messages({
      "string.base": "Payment receipt was entered incorrectly",
      "any.required": "Payment receipt is required",
    }),
    terms: Joi.string().required().messages({
      "string.base": "Contract's term was entered incorrectly",
      "any.required": "Contract's term is required",
    }),
    signed_date: Joi.date().required().messages({
      "date.base":
        "The date the parties signed the contract was entered incorrectly",
      "any.required":
        "The date the parties signed the contract must be entered",
    }),
    start_date: Joi.date().required().messages({
      "date.base": "The start date was entered incorrectly",
      "any.required": "The start date must be entered",
    }),
    end_date: Joi.date().required().messages({
      "date.base": "The end date was entered incorrectly",
      "any.required": "The end date must be entered",
    }),
    paymentId: Joi.number().required().messages({
      "number.base": "Contract's payment id was entered incorrectly",
      "any.required": "Contract's payment id is required",
    }),
    clientId: Joi.number().required().messages({
      "number.base": "Contract's client id was entered incorrectly",
      "any.required": "Contract's client id is required",
    }),
    ownerId: Joi.number().required().messages({
      "number.base": "Contract's owner id was entered incorrectly",
      "any.required": "Contract's owner id is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Contract's vassel id was entered incorrectly",
      "any.required": "Contract's vassel id is required",
    }),
    contractStatusId: Joi.number().required().messages({
      "number.base": "Contract's vassel id was entered incorrectly",
      "any.required": "Contract's vassel id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return contractsValid.validate(body, { abortEarly: false });
};
