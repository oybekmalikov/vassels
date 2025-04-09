const { errorHandler } = require("../helpers/ErrorHandler");
const Vassels = require("../models/vassels.model");
const VasselsCategories = require("../models/vassels_categories.model");
const {
  vasselsCategoriesValidation,
} = require("../validations/vassels_categories.validation");
const addNewVasselsCategory = async (req, res) => {
  try {
    const { error, value } = vasselsCategoriesValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newVasselsCategory = await VasselsCategories.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New VasselsCategory Added`,
      vasselsCategorys: newVasselsCategory.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllVasselsCategorys = async (req, res) => {
  try {
    const allVasselsCategorys = await VasselsCategories.findAll({
      include: [{ model: Vassels }],
    });
    res.status(200).send({
      message: "All VasselsCategorys Selected",
      vasselsCategorys: allVasselsCategorys,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getVasselsCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsCategorys = await VasselsCategories.findAll({
      where: { id: id },
      include: [{ model: Vassels }],
    });
    if (vasselsCategorys.length == 0) {
      return res
        .status(404)
        .send({ message: `VasselsCategory not found with this id: ${id}` });
    }
    res.status(200).send({
      message: "VasselsCategory Selected",
      vasselsCategorys: vasselsCategorys[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateVasselsCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsCategorys = await VasselsCategories.findAll({
      where: { id: id },
    });
    if (vasselsCategorys == []) {
      return res
        .status(404)
        .send({ message: `VasselsCategory not found with this id: ${id}` });
    }
    const { error, value } = vasselsCategoriesValidation({
      ...vasselsCategorys[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateVasselsCategory = await VasselsCategories.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "VasselsCategory updated",
      updatedVasselsCategorys: updateVasselsCategory[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteVasselsCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const vasselsCategorys = await VasselsCategories.destroy({
      where: { id: id },
    });
    if (vasselsCategorys == []) {
      return res
        .status(404)
        .send({ message: `VasselsCategory not found with this id: ${id}` });
    }
    res.status(200).send({
      message: "VasselsCategory Deleted",
      effected: vasselsCategorys,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewVasselsCategory,
  getAllVasselsCategorys,
  getVasselsCategoryById,
  updateVasselsCategoryById,
  deleteVasselsCategoryById,
};
