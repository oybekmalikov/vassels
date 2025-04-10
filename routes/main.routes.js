const router = require("express").Router();
const adminsRouter = require("./admins.routes");
const bookingsRouter = require("./bookings.routes");
const clientsRouter = require("./clients.routes");
const contractsRouter = require("./contracts.routes");
const contractStatusRouter = require("./contract_status.routes");
const feedbacksRouter = require("./feedbacks.routes");
const ownersRouter = require("./owners.routes");
const paymentsRouter = require("./payments.routes");
const penaltiesRouter = require("./penalties.routes");
const vasselsAdditionalsRouter = require("./vassels_additionals.routes");
const vasselsCategoriesRouter = require("./vassels_categories.routes");
const vasselsPricesRouter = require("./vassels_prices.routes");
const vasselsRouter = require("./vassels.routes");
const tasksRouter = require("./tasks.routes");
const registerGuard = require("../middlewares/guards/register.guard");
const roleGuard = require("../middlewares/guards/role.guard");
router.use("/admins", adminsRouter);
router.use("/bookings", registerGuard, bookingsRouter);
router.use("/clients", clientsRouter);
router.use("/contracts", registerGuard, contractsRouter);
router.use(
  "/contract-status",
  registerGuard,
  roleGuard(["admin", "creator"]),
  contractStatusRouter
);
router.use("/feedbacks", feedbacksRouter);
router.use("/owners", ownersRouter);
router.use("/payments", registerGuard, paymentsRouter);
router.use("/penalties", registerGuard, penaltiesRouter);
router.use("/vassels-additionals", vasselsAdditionalsRouter);
router.use("/vassels-categories", vasselsCategoriesRouter);
router.use("/vassels-prices", vasselsPricesRouter);
router.use("/vassels", vasselsRouter);
router.use("/tasks", tasksRouter);
module.exports = router;
