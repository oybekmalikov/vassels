const {
  addNewVasselsAdditional,
  getAllVasselsAdditionals,
  getVasselsAdditionalById,
  updateVasselsAdditionalById,
  deleteVasselsAdditionalById,
} = require("../controllers/vassels_additionals.controller");
const registerGuard = require("../middlewares/guards/register.guard");
const router = require("express").Router();
const vasselAdditional = require("../middlewares/guards/vasselAdditional.guard");
const VasselsAdditionals = require("../models/vassels_additionals.model");
router.post(
  "/",
  registerGuard,
  vasselAdditional(VasselsAdditionals, "create"),
  addNewVasselsAdditional
);
router.get("/", getAllVasselsAdditionals);
router.get("/:id", getVasselsAdditionalById);
router.put(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsAdditionals, "update"),
  updateVasselsAdditionalById
);
router.delete(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsAdditionals, "delete"),
  deleteVasselsAdditionalById
);
module.exports = router;
