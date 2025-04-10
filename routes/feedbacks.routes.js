const {
  addNewFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} = require("../controllers/feedbacks.controller");
const feedbackAccessGuard = require("../middlewares/guards/feedbacks.access.guard");
const registerGuard = require("../middlewares/guards/register.guard");
const Feedbacks = require("../models/feedbacks.model");
const router = require("express").Router();
router.post(
  "/",
  registerGuard,
  feedbackAccessGuard("create", Feedbacks),
  addNewFeedback
);
router.get("/", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.put(
  "/:id",
  registerGuard,
  feedbackAccessGuard("update", Feedbacks),
  updateFeedbackById
);
router.delete(
  "/:id",
  registerGuard,
  feedbackAccessGuard("delete", Feedbacks),
  deleteFeedbackById
);
module.exports = router;
