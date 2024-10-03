const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { createAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.post("/create", protect, createAppointment);

module.exports = router;
