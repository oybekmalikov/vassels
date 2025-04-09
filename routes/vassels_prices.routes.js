const {
  addNewVasselsPrice,
  getAllVasselsPrices,
  getVasselsPriceById,
  updateVasselsPriceById,
  deleteVasselsPriceById,
} = require("../controllers/vassels_prices.controller");
const router = require("express").Router();
router.post("/", addNewVasselsPrice);
router.get("/", getAllVasselsPrices);
router.get("/:id", getVasselsPriceById);
router.put("/:id", updateVasselsPriceById);
router.delete("/:id", deleteVasselsPriceById);
module.exports = router;
