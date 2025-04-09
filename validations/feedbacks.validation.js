const Joi = require("joi");
exports.feedbacksValidation = (body) => {
  const feedbacksValid = Joi.object({
    id: Joi.number(),
    mark: Joi.number().min(1).max(5).required().messages({
      "number.base": "Feedback's mark was entered incorrectly",
      "number.min": "Mark must be greater than or equal to 1",
      "number.max": "Mark must be lower than or equal to 5",
      "any.required": "Feedback's mark is required",
    }),
    comment: Joi.string().required().messages({
      "string.base": "Feedback's comment was entered incorrectly",
      "any.required": "Feedback's comment is required",
    }),
    clientId: Joi.number().required().messages({
      "number.base": "Feedback's client id was entered incorrectly",
      "any.required": "Feedback's client id is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Feedback's vassel id was entered incorrectly",
      "any.required": "Feedback's vassel id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return feedbacksValid.validate(body, { abortEarly: false });
};
