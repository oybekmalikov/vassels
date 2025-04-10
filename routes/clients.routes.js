const {
  addNewClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  activateClient,
  getOtpCode,
  changePassword,
  loginClient,
  logoutClient,
  updateRefreshToken,
} = require("../controllers/clients.controller");
const registerGuard = require("../middlewares/guards/register.guard");
const { clientSelfGuard } = require("../middlewares/guards/self.guard");
const router = require("express").Router();
router.post("/", addNewClient);
router.post("/activate", activateClient);
router.post("/get-otp-code", registerGuard, getOtpCode);
router.post("/login", loginClient);
router.post("/logout", registerGuard, logoutClient);
router.get("/update-refresh-token", registerGuard, updateRefreshToken);
router.post("/change-password", registerGuard, changePassword);
router.get("/", registerGuard, clientSelfGuard, getAllClients);
router.get("/:id", registerGuard, clientSelfGuard, getClientById);
router.put("/:id", registerGuard, clientSelfGuard, updateClientById);
router.delete("/:id", registerGuard, clientSelfGuard, deleteClientById);
module.exports = router;
