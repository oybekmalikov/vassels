const { errorHandler } = require("../helpers/ErrorHandler");
const Vassels = require("../models/vassels.model");
const VasselsPrices = require("../models/vassels_prices.model");
const {
  vasselsPricesValidation,
} = require("../validations/vassels_prices.validation");
const addNewVasselsPrice = async (req, res) => {
  try {
    const { error, value } = vasselsPricesValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newVasselsPrice = await VasselsPrices.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New VasselsPrice Added`,
      vasselsPrice: newVasselsPrice.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllVasselsPrices = async (req, res) => {
  try {
    const allVasselsPrices = await VasselsPrices.findAll({
      include: [{ model: Vassels }],
    });
    res.status(200).send({
      message: "All VasselsPrices Selected",
      vasselsPrices: allVasselsPrices,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getVasselsPriceById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsPrice = await VasselsPrices.findAll({
      where: { id: id },
      include: [{ model: Vassels }],
    });
    if (vasselsPrice.length == 0) {
      return res
        .status(404)
        .send({ message: `VasselsPrice not found with this id: ${id}` });
    }
    res.status(200).send({
      message: "VasselsPrice Selected",
      vasselsPrice: vasselsPrice[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateVasselsPriceById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsPrice = await VasselsPrices.findAll({ where: { id: id } });
    if (vasselsPrice == []) {
      return res
        .status(404)
        .send({ message: `VasselsPrice not found with this id: ${id}` });
    }
    const { error, value } = vasselsPricesValidation({
      ...vasselsPrice[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateVasselsPrice = await VasselsPrices.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "VasselsPrice updated",
      updatedVasselsPrices: updateVasselsPrice[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteVasselsPriceById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsPrice = await VasselsPrices.destroy({ where: { id: id } });
    if (vasselsPrice == []) {
      return res
        .status(404)
        .send({ message: `VasselsPrice not found with this id: ${id}` });
    }
    res
      .status(200)
      .send({ message: "VasselsPrice Deleted", effected: vasselsPrice });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewVasselsPrice,
  getAllVasselsPrices,
  getVasselsPriceById,
  updateVasselsPriceById,
  deleteVasselsPriceById,
};
