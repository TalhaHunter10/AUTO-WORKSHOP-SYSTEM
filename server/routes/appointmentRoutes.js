const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  createAppointment,
  deleteAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/create", protect, createAppointment);
router.get("/get", protect, getAppointments);
router.delete("/delete/:id", protect, deleteAppointment);

module.exports = router;
