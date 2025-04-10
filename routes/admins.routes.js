const {
  addNewAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
  logoutAdmin,
  updateRefreshToken,
} = require("../controllers/admins.controller");
const registerGuard = require("../middlewares/guards/register.guard");
const { adminSelfGuard } = require("../middlewares/guards/self.guard");
const router = require("express").Router();
router.post("/", addNewAdmin);
router.post("/login", loginAdmin);
router.post("/logout", registerGuard, logoutAdmin);
router.get("/update-refresh-token", registerGuard, updateRefreshToken);
router.get("/", registerGuard, adminSelfGuard, getAllAdmins);
router.get("/:id", registerGuard, adminSelfGuard, getAdminById);
router.put("/:id", registerGuard, adminSelfGuard, updateAdminById);
router.delete("/:id", registerGuard, adminSelfGuard, deleteAdminById);
module.exports = router;
