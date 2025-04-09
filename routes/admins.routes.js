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
const router = require("express").Router();
router.post("/", addNewAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/update-refresh-token", updateRefreshToken);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);
module.exports = router;
