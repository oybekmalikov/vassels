const {
  addNewBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
} = require("../controllers/bookings.controller");
const router = require("express").Router();
router.post("/", addNewBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBookingById);
router.delete("/:id", deleteBookingById);
module.exports = router;
