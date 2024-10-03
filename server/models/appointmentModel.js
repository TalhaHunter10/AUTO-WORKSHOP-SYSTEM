const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  IssuedDate: {
    type: Date,
    required: false,
  },
  additionalNote: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
