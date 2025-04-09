const {
  addNewVassel,
  getAllVassels,
  getVasselById,
  updateVasselById,
  deleteVasselById,
} = require("../controllers/vassels.controller");
const router = require("express").Router();
router.post("/", addNewVassel);
router.get("/", getAllVassels);
router.get("/:id", getVasselById);
router.put("/:id", updateVasselById);
router.delete("/:id", deleteVasselById);
module.exports = router;
