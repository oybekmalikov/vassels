const {
  addNewPenalty,
  getAllPenaltys,
  getPenaltyById,
  updatePenaltyById,
  deletePenaltyById,
} = require("../controllers/penalties.controller");
const penaltiesAccessGuard = require("../middlewares/guards/penalties.access.guard");
const Penalties = require("../models/penalties.model");
const router = require("express").Router();
router.post("/", penaltiesAccessGuard("create", Penalties), addNewPenalty);
router.get("/", penaltiesAccessGuard("read", Penalties), getAllPenaltys);
router.get("/:id", penaltiesAccessGuard("read", Penalties), getPenaltyById);
router.put(
  "/:id",
  penaltiesAccessGuard("update", Penalties),
  updatePenaltyById
);
router.delete(
  "/:id",
  penaltiesAccessGuard("delete", Penalties),
  deletePenaltyById
);
module.exports = router;
