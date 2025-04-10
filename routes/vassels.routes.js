const {
  addNewVassel,
  getAllVassels,
  getVasselById,
  updateVasselById,
  deleteVasselById,
} = require("../controllers/vassels.controller");
const router = require("express").Router();
const ownerAccessGuard = require("../middlewares/guards/vassels.access.guard");
const registerGuard = require("../middlewares/guards/register.guard");
const Vassels = require("../models/vassels.model");
router.post(
  "/",
  registerGuard,
  ownerAccessGuard("create", Vassels),
  addNewVassel
);
router.get("/", getAllVassels);
router.get("/:id", getVasselById);
router.put(
  "/:id",
  registerGuard,
  ownerAccessGuard("update", Vassels),
  updateVasselById
);
router.delete(
  "/:id",
  registerGuard,
  ownerAccessGuard("delete", Vassels),
  deleteVasselById
);
module.exports = router;
