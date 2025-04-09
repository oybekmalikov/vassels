const {
  addNewVasselsCategory,
  getAllVasselsCategorys,
  getVasselsCategoryById,
  updateVasselsCategoryById,
  deleteVasselsCategoryById,
} = require("../controllers/vassels_categories.controller");
const router = require("express").Router();
router.post("/", addNewVasselsCategory);
router.get("/", getAllVasselsCategorys);
router.get("/:id", getVasselsCategoryById);
router.put("/:id", updateVasselsCategoryById);
router.delete("/:id", deleteVasselsCategoryById);
module.exports = router;
