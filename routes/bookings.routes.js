const {
  addNewBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
} = require("../controllers/bookings.controller");
const bookingAccessGuard = require("../middlewares/guards/bookings.access.guard");
const Bookings = require("../models/bookings.model");
const router = require("express").Router();
router.post("/", bookingAccessGuard("create", Bookings), addNewBooking);
router.get("/", bookingAccessGuard("read", Bookings), getAllBookings);
router.get("/:id", bookingAccessGuard("read", Bookings), getBookingById);
router.put("/:id", bookingAccessGuard("update", Bookings), updateBookingById);
router.delete(
  "/:id",
  bookingAccessGuard("delete", Bookings),
  deleteBookingById
);
module.exports = router;
