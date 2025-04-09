const { errorHandler } = require("../helpers/ErrorHandler");
const Vassels = require("../models/vassels.model");
const { vasselsValidation } = require("../validations/vassels.validation");
const Owners = require("../models/owners.model");
const VasselsCategories = require("../models/vassels_categories.model");
const VasselsPrices = require("../models/vassels_prices.model");
const Penalties = require("../models/penalties.model");
const Bookings = require("../models/bookings.model");
const VasselsAdditionals = require("../models/vassels_additionals.model");
const Contracts = require("../models/contracts.model");
const Feedbacks = require("../models/feedbacks.model");
const addNewVassel = async (req, res) => {
  try {
    const { error, value } = vasselsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newVassel = await Vassels.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Vassel Added`,
      vassel: newVassel.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllVassels = async (req, res) => {
  try {
    const allVassels = await Vassels.findAll({
      include: [
        { model: VasselsCategories },
        { model: Owners },
        { model: VasselsPrices },
        { model: Penalties },
        { model: Bookings },
        { model: VasselsAdditionals },
        { model: Contracts },
        { model: Feedbacks },
      ],
    });
    res
      .status(200)
      .send({ message: "All Vassels Selected", vassels: allVassels });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getVasselById = async (req, res) => {
  try {
    const id = req.params.id;
    const vassel = await Vassels.findAll({
      where: { id: id },
      include: [
        { model: VasselsCategories },
        { model: Owners },
        { model: VasselsPrices },
        { model: Penalties },
        { model: Bookings },
        { model: VasselsAdditionals },
        { model: Contracts },
        { model: Feedbacks },
      ],
    });
    if (vassel.length == 0) {
      return res
        .status(404)
        .send({ message: `Vassel not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Vassel Selected", vassel: vassel[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateVasselById = async (req, res) => {
  try {
    const id = req.params.id;
    const vassel = await Vassels.findAll({ where: { id: id } });
    if (vassel == []) {
      return res
        .status(404)
        .send({ message: `Vassel not found with this id: ${id}` });
    }
    const { error, value } = vasselsValidation({
      ...vassel[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateVassel = await Vassels.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Vassel updated",
      updatedVassels: updateVassel[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteVasselById = async (req, res) => {
  try {
    const id = req.params.id;
    const vassel = await Vassels.destroy({ where: { id: id } });
    if (vassel == []) {
      return res
        .status(404)
        .send({ message: `Vassel not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Vassel Deleted", effected: vassel });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewVassel,
  getAllVassels,
  getVasselById,
  updateVasselById,
  deleteVasselById,
};
