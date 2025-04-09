const {
  addNewOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  loginOwner,
  logoutOwner,
  updateRefreshToken,
  getOtpCode,
  changePassword,
  activateOwner,
} = require("../controllers/owners.controller");
const router = require("express").Router();
router.post("/", addNewOwner);
router.post("/login", loginOwner);
router.post("/logout", logoutOwner);
router.get("/update-refresh-token", updateRefreshToken);
router.post("/get-otp-code", getOtpCode);
router.post("/activate", activateOwner);
router.post("/change-password", changePassword);
router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.put("/:id", updateOwnerById);
router.delete("/:id", deleteOwnerById);
module.exports = router;
