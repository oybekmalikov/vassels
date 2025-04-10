const {
  taskA,
  taskB,
  taskC,
  taskD,
  taskE,
} = require("../controllers/task.controller");
const router = require("express").Router();
router.post("/a", taskA);
router.post("/b", taskB);
router.post("/c", taskC);
router.post("/d", taskD);
router.post("/e", taskE);
module.exports = router;
