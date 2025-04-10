const {
  addNewVasselsCategory,
  getAllVasselsCategorys,
  getVasselsCategoryById,
  updateVasselsCategoryById,
  deleteVasselsCategoryById,
} = require("../controllers/vassels_categories.controller");
const registerGuard = require("../middlewares/guards/register.guard");
const router = require("express").Router();
const vasselAdditional = require("../middlewares/guards/vasselAdditional.guard");
const VasselsCategories = require("../models/vassels_categories.model");
router.post(
  "/",
  registerGuard,
  vasselAdditional(VasselsCategories, "create"),
  addNewVasselsCategory
);
router.get("/", getAllVasselsCategorys);
router.get("/:id", getVasselsCategoryById);
router.put(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsCategories, "update"),
  updateVasselsCategoryById
);
router.delete(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsCategories, "delete"),
  deleteVasselsCategoryById
);
module.exports = router;
