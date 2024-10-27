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

const getAppointments = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const appointments = await Appointment.find({ userId: user }).sort({
    createdAt: -1,
  });
  res.json(appointments);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const appointmentId = req.params.id;
  const appointment = await Appointment.findOne({
    userId: user,
    _id: appointmentId,
  });

  if (!appointment) {
    res.status(404).json({
      message: "Appointment not found",
      status: 404,
      type: "notFound",
    });
    throw new Error("Appointment not found");
  }

  await appointment.deleteOne();
  res.status(200).json({ message: "Appointment removed" });
});

const getLatestAppointments = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const appointments = await Appointment.find({
    createdAt: { $gte: thirtyDaysAgo },
  })
    .sort({ createdAt: -1 })
    .populate("userId", "name phoneno");

  res.status(200).json(appointments);
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .sort({ createdAt: -1 })
    .populate("userId", "name phoneno");

  res.status(200).json(appointments);
});

module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointment,
  getLatestAppointments,
  getAllAppointments,
};
