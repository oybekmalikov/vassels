const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controllers/contracts.controller");
const contractAccessGuard = require("../middlewares/guards/contracts.access.guard");
const Contracts = require("../models/contracts.model");
const router = require("express").Router();
router.post("/", contractAccessGuard("create", Contracts), addNewContract);
router.get("/", contractAccessGuard("read", Contracts), getAllContracts);
router.get("/:id", contractAccessGuard("read", Contracts), getContractById);
router.put(
  "/:id",
  contractAccessGuard("update", Contracts),
  updateContractById
);
router.delete(
  "/:id",
  contractAccessGuard("delete", Contracts),
  deleteContractById
);
module.exports = router;
