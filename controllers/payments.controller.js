const { errorHandler } = require("../helpers/ErrorHandler");
const Payments = require("../models/payments.model");
const Clients = require("../models/clients.model");
const Bookings = require("../models/bookings.model");
const { paymentsValidation } = require("../validations/payments.validation");
const Owners = require("../models/owners.model");
const addNewPayment = async (req, res) => {
  try {
    const { error, value } = paymentsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newPayment = await Payments.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Payment Added`,
      payment: newPayment.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payments.findAll({
      include: [{ model: Clients }, { model: Owners }, { model: Bookings }],
    });
    res
      .status(200)
      .send({ message: "All Payments Selected", payments: allPayments });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findAll({
      where: { id: id },
      include: [{ model: Clients }, { model: Owners }, { model: Bookings }],
    });
    if (payment.length == 0) {
      return res
        .status(404)
        .send({ message: `Payment not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Payment Selected", payment: payment[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updatePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findAll({ where: { id: id } });
    if (payment == []) {
      return res
        .status(404)
        .send({ message: `Payment not found with this id: ${id}` });
    }
    const { error, value } = paymentsValidation({
      ...payment[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updatePayment = await Payments.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Payment updated",
      updatedPayments: updatePayment[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deletePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.destroy({ where: { id: id } });
    if (payment == []) {
      return res
        .status(404)
        .send({ message: `Payment not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Payment Deleted", effected: payment });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
