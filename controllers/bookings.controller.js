const { errorHandler } = require("../helpers/ErrorHandler");
const Bookings = require("../models/bookings.model");
const Clients = require("../models/clients.model");
const Payments = require("../models/payments.model");
const Penalties = require("../models/penalties.model");
const Vassels = require("../models/vassels.model");
const { bookingsValidation } = require("../validations/bookings.validation");
const addNewBooking = async (req, res) => {
  try {
    const { error, value } = bookingsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newBooking = await Bookings.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Booking Added`,
      booking: newBooking.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await Bookings.findAll({
      include: [
        { model: Clients },
        { model: Vassels },
        { model: Penalties },
        { model: Payments },
      ],
    });
    res
      .status(200)
      .send({ message: "All Bookings Selected", bookings: allBookings });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findAll({
      where: { id: id },
      include: [
        { model: Clients },
        { model: Vassels },
        { model: Penalties },
        { model: Payments },
      ],
    });
    if (booking.length == 0) {
      return res
        .status(404)
        .send({ message: `Booking not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Booking Selected", booking: booking[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findAll({ where: { id: id } });
    if (booking == []) {
      return res
        .status(404)
        .send({ message: `Booking not found with this id: ${id}` });
    }
    const { error, value } = bookingsValidation({
      ...booking[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateBooking = await Bookings.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Booking updated",
      updatedBookings: updateBooking[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.destroy({ where: { id: id } });
    if (booking == []) {
      return res
        .status(404)
        .send({ message: `Booking not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Booking Deleted", effected: booking });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
