const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAllAppointments,
  getLatestAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/create", protect, createAppointment);
router.get("/get", protect, getAppointments);
router.delete("/delete/:id", protect, deleteAppointment);
router.get("/getall", protect, getAllAppointments);
router.get("/getlatest", protect, getLatestAppointments);

module.exports = router;
