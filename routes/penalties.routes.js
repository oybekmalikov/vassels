const {
  addNewPenalty,
  getAllPenaltys,
  getPenaltyById,
  updatePenaltyById,
  deletePenaltyById,
} = require("../controllers/penalties.controller");
const router = require("express").Router();
router.post("/", addNewPenalty);
router.get("/", getAllPenaltys);
router.get("/:id", getPenaltyById);
router.put("/:id", updatePenaltyById);
router.delete("/:id", deletePenaltyById);
module.exports = router;
