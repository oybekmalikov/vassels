const {
  addNewFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} = require("../controllers/feedbacks.controller");
const router = require("express").Router();
router.post("/", addNewFeedback);
router.get("/", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.put("/:id", updateFeedbackById);
router.delete("/:id", deleteFeedbackById);
module.exports = router;
