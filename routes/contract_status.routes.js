const {
  addNewContractStatus,
  getAllContractStatuss,
  getContractStatusById,
  updateContractStatusById,
  deleteContractStatusById,
} = require("../controllers/contract_status.controller");
const router = require("express").Router();
router.post("/", addNewContractStatus);
router.get("/", getAllContractStatuss);
router.get("/:id", getContractStatusById);
router.put("/:id", updateContractStatusById);
router.delete("/:id", deleteContractStatusById);
module.exports = router;
