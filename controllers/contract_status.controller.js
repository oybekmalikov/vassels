const { errorHandler } = require("../helpers/ErrorHandler");
const ContractStatus = require("../models/contract_status.model");
const Contracts = require("../models/contracts.model");
const {
  contractStatusValidation,
} = require("../validations/contract_status.validation");
const addNewContractStatus = async (req, res) => {
  try {
    const { error, value } = contractStatusValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newContractStatus = await ContractStatus.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New ContractStatus Added`,
      contract: newContractStatus.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllContractStatuss = async (req, res) => {
  try {
    const allContractStatuss = await ContractStatus.findAll({
      include: [{ model: Contracts }],
    });
    res.status(200).send({
      message: "All ContractStatuss Selected",
      contracts: allContractStatuss,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await ContractStatus.findAll({
      where: { id: id },
      include: [{ model: Contracts }],
    });
    if (contract.length == 0) {
      return res
        .status(404)
        .send({ message: `ContractStatus not found with this id: ${id}` });
    }
    res
      .status(200)
      .send({ message: "ContractStatus Selected", contract: contract[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await ContractStatus.findAll({ where: { id: id } });
    if (contract == []) {
      return res
        .status(404)
        .send({ message: `ContractStatus not found with this id: ${id}` });
    }
    const { error, value } = contractStatusValidation({
      ...contract[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateContractStatus = await ContractStatus.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "ContractStatus updated",
      updatedContractStatuss: updateContractStatus[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await ContractStatus.destroy({ where: { id: id } });
    if (contract == []) {
      return res
        .status(404)
        .send({ message: `ContractStatus not found with this id: ${id}` });
    }
    res
      .status(200)
      .send({ message: "ContractStatus Deleted", effected: contract });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewContractStatus,
  getAllContractStatuss,
  getContractStatusById,
  updateContractStatusById,
  deleteContractStatusById,
};
