const { errorHandler } = require("../helpers/ErrorHandler");
const Penalties = require("../models/penalties.model");
const Clients = require("../models/clients.model");
const { penaltiesValidation } = require("../validations/penalties.validation");
const Bookings = require("../models/bookings.model");
const Vassels = require("../models/vassels.model");
const addNewPenalty = async (req, res) => {
  try {
    const { error, value } = penaltiesValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newPenalty = await Penalties.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Penalty Added`,
      penalty: newPenalty.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllPenaltys = async (req, res) => {
  try {
    const allPenaltys = await Penalties.findAll({
      include: [{ model: Clients }, { model: Vassels }, { model: Bookings }],
    });
    res
      .status(200)
      .send({ message: "All Penaltys Selected", penaltys: allPenaltys });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getPenaltyById = async (req, res) => {
  try {
    const id = req.params.id;
    const penalty = await Penalties.findAll({
      where: { id: id },
      include: [{ model: Clients }, { model: Vassels }, { model: Bookings }],
    });
    if (penalty.length == 0) {
      return res
        .status(404)
        .send({ message: `Penalty not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Penalty Selected", penalty: penalty[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updatePenaltyById = async (req, res) => {
  try {
    const id = req.params.id;
    const penalty = await Penalties.findAll({ where: { id: id } });
    if (penalty == []) {
      return res
        .status(404)
        .send({ message: `Penalty not found with this id: ${id}` });
    }
    const { error, value } = penaltiesValidation({
      ...penalty[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updatePenalty = await Penalties.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Penalty updated",
      updatedPenaltys: updatePenalty[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deletePenaltyById = async (req, res) => {
  try {
    const id = req.params.id;
    const penalty = await Penalties.destroy({ where: { id: id } });
    if (penalty == []) {
      return res
        .status(404)
        .send({ message: `Penalty not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Penalty Deleted", effected: penalty });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewPenalty,
  getAllPenaltys,
  getPenaltyById,
  updatePenaltyById,
  deletePenaltyById,
};
