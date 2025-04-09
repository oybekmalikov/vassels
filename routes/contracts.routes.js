const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controllers/contracts.controller");
const router = require("express").Router();
router.post("/", addNewContract);
router.get("/", getAllContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContractById);
router.delete("/:id", deleteContractById);
module.exports = router;
