const Joi = require("joi");
exports.bookingsValidation = (body) => {
  const bookingsValid = Joi.object({
    start_date: Joi.date()
      .message("Booking's start date was entered incorrectly")
      .required()
      .message("Booking's start date is required"),
    end_date: Joi.date()
      .message("Booking's end date was entered incorrectly")
      .required()
      .message("Booking's end date is required"),
    cost: Joi.number()
      .message("Booking's cost was entered incorrectly")
      .required()
      .message("Booking's cost is required."),
    status: Joi.string()
      .valid("pending", "confirmed", "canceled", "completed")
      .message("Bookings's status was entered incorrectly")
      .required()
      .message("Bookings's status is required"),
    notes: Joi.string(),
    client_id: Joi.number()
      .message("Booking's client id was entered incorrectly")
      .required()
      .message("Booking's client id is required"),
    vassel_id: Joi.number()
      .message("Booking's vassel id was entered incorrectly")
      .required()
      .message("Booking's vassel id is required"),
  });
  return bookingsValid.validate(body, { abortEarly: false });
};
