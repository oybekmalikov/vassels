const { errorHandler } = require("../helpers/ErrorHandler");
const Contracts = require("../models/contracts.model");
const Clients = require("../models/clients.model");
const Vassels = require("../models/vassels.model");
const { contractsValidation } = require("../validations/contracts.validation");
const Payments = require("../models/payments.model");
const Owners = require("../models/owners.model");
const ContractStatus = require("../models/contract_status.model");
const addNewContract = async (req, res) => {
  try {
    const { error, value } = contractsValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newContract = await Contracts.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Contract Added`,
      contract: newContract.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllContracts = async (req, res) => {
  try {
    const allContracts = await Contracts.findAll({
      include: [
        { model: Payments },
        { model: Clients },
        { model: Owners },
        { model: Vassels },
        { model: ContractStatus },
      ],
    });
    res
      .status(200)
      .send({ message: "All Contracts Selected", contracts: allContracts });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.findAll({
      where: { id: id },
      include: [
        { model: Payments },
        { model: Clients },
        { model: Owners },
        { model: Vassels },
        { model: ContractStatus },
      ],
    });
    if (contract.length == 0) {
      return res
        .status(404)
        .send({ message: `Contract not found with this id: ${id}` });
    }
    res
      .status(200)
      .send({ message: "Contract Selected", contract: contract[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.findAll({ where: { id: id } });
    if (contract == []) {
      return res
        .status(404)
        .send({ message: `Contract not found with this id: ${id}` });
    }
    const { error, value } = contractsValidation({
      ...contract[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateContract = await Contracts.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Contract updated",
      updatedContracts: updateContract[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.destroy({ where: { id: id } });
    if (contract == []) {
      return res
        .status(404)
        .send({ message: `Contract not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Contract Deleted", effected: contract });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
};
