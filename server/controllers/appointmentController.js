const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

const createAppointment = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { subject, carName, carNumber, details, date, additionalNote } =
    req.body;
  if (!subject || !carName || !carNumber || !details || !date) {
    res.status(400).json({ message: "All fields are required", status: 400 });
    throw new Error("All fields are required");
  }

  const existingAppointment = await Appointment.findOne({
    userId: user,
    carNumber: carNumber,
    requestedDate: date,
  });

  console.log(existingAppointment);

  if (existingAppointment) {
    res.status(400).json({
      message: "Appointment already exists",
      status: 400,
      type: "alreadyExists",
    });
    throw new Error(
      "An appointment with the same car number and date already exists."
    );
  }

  const newAppointment = new Appointment({
    userId: user,
    subject,
    carName,
    carNumber,
    details,
    requestedDate: date,
    additionalNote: additionalNote || "",
    createdAt: new Date(),
  });

  try {
    const createdAppointment = await newAppointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create appointment");
  }
});

module.exports = { createAppointment };
