const Joi = require("joi");
exports.bookingsValidation = (body) => {
  const bookingsValid = Joi.object({
    id: Joi.number(),
    start_date: Joi.date().required().messages({
      "date.base": "Booking's start date was entered incorrectly",
      "any.required": "Booking's start date is required",
    }),
    end_date: Joi.date().required().messages({
      "date.base": "Booking's end date was entered incorrectly",
      "any.required": "Booking's end date is required",
    }),
    cost: Joi.number().required().messages({
      "number.base": "Booking's cost was entered incorrectly",
      "any.required": "Booking's cost is required.",
    }),
    status: Joi.string()
      .valid("pending", "confirmed", "canceled", "completed")
      .required()
      .messages({
        "any.only":
          "Booking's status must be one of: pending, confirmed, canceled, or completed",
        "string.base": "Booking's status was entered incorrectly",
        "any.required": "Booking's status is required",
      }),
    notes: Joi.string().optional(),
    clientId: Joi.number().required().messages({
      "number.base": "Booking's client id was entered incorrectly",
      "any.required": "Booking's client id is required",
    }),
    vasselId: Joi.number().required().messages({
      "number.base": "Booking's vassel id was entered incorrectly",
      "any.required": "Booking's vassel id is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });
  return bookingsValid.validate(body, { abortEarly: false });
};
