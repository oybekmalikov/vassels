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
const router = require("express").Router();
router.post("/", addNewClient);
router.post("/activate", activateClient);
router.post("/get-otp-code", getOtpCode);
router.post("/login", loginClient);
router.post("/logout", logoutClient);
router.get("/update-refresh-token", updateRefreshToken);
router.post("/change-password", changePassword);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", updateClientById);
router.delete("/:id", deleteClientById);
module.exports = router;
