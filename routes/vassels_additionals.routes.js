const {
  addNewVasselsAdditional,
  getAllVasselsAdditionals,
  getVasselsAdditionalById,
  updateVasselsAdditionalById,
  deleteVasselsAdditionalById,
} = require("../controllers/vassels_additionals.controller");
const router = require("express").Router();
router.post("/", addNewVasselsAdditional);
router.get("/", getAllVasselsAdditionals);
router.get("/:id", getVasselsAdditionalById);
router.put("/:id", updateVasselsAdditionalById);
router.delete("/:id", deleteVasselsAdditionalById);
module.exports = router;
