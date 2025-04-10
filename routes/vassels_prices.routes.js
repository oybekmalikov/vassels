const {
  addNewVasselsPrice,
  getAllVasselsPrices,
  getVasselsPriceById,
  updateVasselsPriceById,
  deleteVasselsPriceById,
} = require("../controllers/vassels_prices.controller");
const registerGuard = require("../middlewares/guards/register.guard");
const router = require("express").Router();
const vasselAdditional = require("../middlewares/guards/vasselAdditional.guard");
const VasselsPrices = require("../models/vassels_prices.model");
router.post(
  "/",
  registerGuard,
  vasselAdditional(VasselsPrices, "create"),
  addNewVasselsPrice
);
router.get("/", getAllVasselsPrices);
router.get("/:id", getVasselsPriceById);
router.put(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsPrices, "update"),
  updateVasselsPriceById
);
router.delete(
  "/:id",
  registerGuard,
  vasselAdditional(VasselsPrices, "delete"),
  deleteVasselsPriceById
);
module.exports = router;
