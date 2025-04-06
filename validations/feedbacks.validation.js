const Joi = require("joi");
exports.feedbacksValidation = (body) => {
  const feedbacksValid = Joi.object({
    mark: Joi.number()
      .message("Feedback's mark was entered incorrectly")
      .min(1)
      .message(`Mark must greater than "1"`)
      .max(5)
      .message(`Mark must lower than "5"`)
      .required()
      .message("Feedback's mark is required"),
    comment: Joi.string()
      .message("Feedback's comment was entered incorrectly")
      .required()
      .message("Feedback's comment is required"),
    client_id: Joi.number()
      .message("Feedback's client id was entered incorrectly")
      .required()
      .message("Feedback's client id is required"),
    vassel_id: Joi.number()
      .message("Feedback's vassel id was entered incorrectly")
      .required()
      .message("Feedback's vassel id is required"),
  });
  return feedbacksValid.validate(body, { abortEarly: false });
};
