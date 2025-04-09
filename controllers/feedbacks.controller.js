const { errorHandler } = require("../helpers/ErrorHandler");
const Feedbacks = require("../models/feedbacks.model");
const Clients = require("../models/clients.model");
const Vassels = require("../models/vassels.model");
const { feedbacksValidation } = require("../validations/feedbacks.validation");
const addNewFeedback = async (req, res) => {
  try {
    const { error, value } = feedbacksValidation({
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const newFeedback = await Feedbacks.create(
      {
        ...value,
      },
      { returning: true }
    );
    res.status(201).send({
      message: `New Feedback Added`,
      feedback: newFeedback.dataValues,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllFeedbacks = async (req, res) => {
  try {
    const allFeedbacks = await Feedbacks.findAll({
      include: [
        { model: Clients },
        { model: Vassels },
      ],
    });
    res
      .status(200)
      .send({ message: "All Feedbacks Selected", feedbacks: allFeedbacks });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedbacks.findAll({
      where: { id: id },
      include: [
        { model: Clients },
        { model: Vassels },
      ],
    });
    if (feedback.length == 0) {
      return res
        .status(404)
        .send({ message: `Feedback not found with this id: ${id}` });
    }
    res
      .status(200)
      .send({ message: "Feedback Selected", feedback: feedback[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedbacks.findAll({ where: { id: id } });
    if (feedback == []) {
      return res
        .status(404)
        .send({ message: `Feedback not found with this id: ${id}` });
    }
    const { error, value } = feedbacksValidation({
      ...feedback[0].dataValues,
      ...req.body,
    });
    if (error) {
      return errorHandler(error, res);
    }
    const updateFeedback = await Feedbacks.update(
      { ...value },
      { where: { id: id }, returning: true }
    );
    res.status(200).send({
      message: "Feedback updated",
      updatedFeedbacks: updateFeedback[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteFeedbackById = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedbacks.destroy({ where: { id: id } });
    if (feedback == []) {
      return res
        .status(404)
        .send({ message: `Feedback not found with this id: ${id}` });
    }
    res.status(200).send({ message: "Feedback Deleted", effected: feedback });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};
