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
const registerGuard = require("../middlewares/guards/register.guard");
const { ownerSelfGuard } = require("../middlewares/guards/self.guard");
const router = require("express").Router();
router.post("/", addNewOwner);
router.post("/login", loginOwner);
router.post("/logout", registerGuard, logoutOwner);
router.get("/update-refresh-token", registerGuard, updateRefreshToken);
router.post("/get-otp-code", registerGuard, getOtpCode);
router.post("/activate", activateOwner);
router.post("/change-password", registerGuard, changePassword);
router.get("/", registerGuard, ownerSelfGuard, getAllOwners);
router.get("/:id", registerGuard, ownerSelfGuard, getOwnerById);
router.put("/:id", registerGuard, ownerSelfGuard, updateOwnerById);
router.delete("/:id", registerGuard, ownerSelfGuard, deleteOwnerById);
module.exports = router;
