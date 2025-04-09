const { errorHandler } = require("../helpers/ErrorHandler");
const VasselsAdditionals = require("../models/vassels_additionals.model");
const {
  vasselsAdditionalsValidation,
} = require("../validations/vassels_additionls.validation");
const Vassels = require("../models/vassels.model");
const addNewVasselsAdditional = async (req, res) => {
  try {
    const { error, value } = vasselsAdditionalsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newVasselsAdditional = await VasselsAdditionals.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New VasselsAdditional Added`,
      vasselsAdditionals: newVasselsAdditional.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllVasselsAdditionals = async (req, res) => {
  try {
    const allVasselsAdditionals = await VasselsAdditionals.findAll({
      include: [{ model: Vassels }],
    });
    res.status(200).send({
      message: "All VasselsAdditionals Selected",
      vasselsAdditionals: allVasselsAdditionals,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getVasselsAdditionalById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsAdditionals = await VasselsAdditionals.findAll({
      where: { id: id },
      include: [{ model: Vassels }],
    });
    if (vasselsAdditionals.length == 0) {
      return res
        .status(404)
        .send({ message: `VasselsAdditional not found with this id: ${id}` });
    }
    res.status(200).send({
      message: "VasselsAdditional Selected",
      vasselsAdditionals: vasselsAdditionals[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateVasselsAdditionalById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsAdditionals = await VasselsAdditionals.findAll({
      where: { id: id },
    });
    if (vasselsAdditionals == []) {
      return res
        .status(404)
        .send({ message: `VasselsAdditional not found with this id: ${id}` });
    }
    const { error, value } = vasselsAdditionalsValidation({
      ...vasselsAdditionals[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateVasselsAdditional = await VasselsAdditionals.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "VasselsAdditional updated",
      updatedVasselsAdditionals: updateVasselsAdditional[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteVasselsAdditionalById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsAdditionals = await VasselsAdditionals.destroy({
      where: { id: id },
    });
    if (vasselsAdditionals == []) {
      return res
        .status(404)
        .send({ message: `VasselsAdditional not found with this id: ${id}` });
    }
    res.status(200).send({
      message: "VasselsAdditional Deleted",
      effected: vasselsAdditionals,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewVasselsAdditional,
  getAllVasselsAdditionals,
  getVasselsAdditionalById,
  updateVasselsAdditionalById,
  deleteVasselsAdditionalById,
};
