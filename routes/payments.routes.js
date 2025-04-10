const {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payments.controller");
const paymentAccessGuard = require("../middlewares/guards/payments.access.guard");
const Payments = require("../models/payments.model");
const router = require("express").Router();
router.post("/", paymentAccessGuard("create", Payments), addNewPayment);
router.get("/", paymentAccessGuard("read", Payments), getAllPayments);
router.get("/:id", paymentAccessGuard("read", Payments), getPaymentById);
router.put("/:id", paymentAccessGuard("update", Payments), updatePaymentById);
router.delete(
  "/:id",
  paymentAccessGuard("delete", Payments),
  deletePaymentById
);
module.exports = router;
