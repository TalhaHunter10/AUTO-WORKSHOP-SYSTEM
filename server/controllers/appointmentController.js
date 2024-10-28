const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const sendEmail = require("../utils/sendEmail");

const createAppointment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { subject, carName, carNumber, details, date, additionalNote } =
    req.body;

  if (!subject || !carName || !carNumber || !details || !date) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: 400 });
  }

  const foundUser = await User.findById(userId);
  if (!foundUser) {
    return res.status(404).json({ message: "User not found", status: 404 });
  }

  const existingAppointment = await Appointment.findOne({
    userId,
    carNumber,
    requestedDate: new Date(date).toISOString(),
  });

  if (existingAppointment) {
    return res.status(400).json({
      message: "Appointment already exists",
      status: 400,
      type: "alreadyExists",
    });
  }

  const newAppointment = new Appointment({
    userId,
    subject,
    carName,
    carNumber,
    details,
    requestedDate: new Date(date).toISOString(),
    additionalNote: additionalNote || "",
    createdAt: new Date(),
  });

  try {
    const createdAppointment = await newAppointment.save();

    const message = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0056b3;">Hello ${foundUser.name},</h2>
          <p>Thank you for scheduling an appointment with Capital Autos. Your appointment request has been successfully received and is currently under review.</p>

          <h3 style="color: #0056b3;">Appointment Details:</h3>
          <ul>
            <li><strong>Subject:</strong> ${newAppointment.subject}</li>
            <li><strong>Car Name:</strong> ${newAppointment.carName}</li>
            <li><strong>Car Number:</strong> ${newAppointment.carNumber}</li>
            <li><strong>Requested Date:</strong> ${newAppointment.requestedDate}</li>
            <li><strong>Status:</strong> Pending Approval</li>
          </ul>

          <p>Our team will review your appointment request and notify you as soon as it is confirmed. We appreciate your patience and look forward to serving you.</p>

          <p>For any questions or further assistance, please feel free to reach out to us.</p>

          <p>Best Regards,</p>
          <p><strong>Capital Autos Team</strong></p>
        </div>
      `;

    const emailSubject = "Appointment Pending Approval - Capital Autos";
    const sendTo = foundUser.email;
    const sentFrom = process.env.EMAIL_USER;

    try {
      await sendEmail(emailSubject, message, sendTo, sentFrom);
    } catch (error) {
      res.status(500);
      throw new Error("Email could not be Sent. Please try again !");
    }

    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
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

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { additionalNote, status, issuedDate } = req.body;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    res.status(404).json({ message: "Appointment not found", status: 404 });
    throw new Error("Appointment not found");
  }

  appointment.status = status || appointment.status;
  appointment.additionalNote = additionalNote || appointment.additionalNote;
  appointment.issuedDate = issuedDate || appointment.issuedDate;

  const updatedAppointment = await appointment.save();

  let message = "";
  let emailSubject = "";
  let sendTo = "";
  let sentFrom = "";

  const user = await User.findById(appointment.userId);

  if (status === "Rejected") {
    message = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0056b3;">Hello ${user.name},</h2>
          <p>We regret to inform you that your appointment request with Capital Autos has been rejected.</p>

          <h3 style="color: #0056b3;">Appointment Details:</h3>
          <ul>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
            <li><strong>Car Name:</strong> ${appointment.carName}</li>
            <li><strong>Car Number:</strong> ${appointment.carNumber}</li>
            <li><strong>Requested Date:</strong> ${appointment.requestedDate}</li>
            <li><strong>Status:</strong> Rejected</li>
          </ul>

          <h3 style="color: #0056b3;">Manager Note:</h3>
          <p>${additionalNote}</p>

          <p>If you have any questions or need further assistance, please feel free to reach out to us.</p>

          <p>Best Regards,</p>
          <p><strong>Capital Autos Team</strong></p>
        </div>
      `;

    emailSubject = "Appointment Rejected - Capital Autos";
    sendTo = user.email;
    sentFrom = process.env.EMAIL_USER;
  }

  if (status === "Approved") {
    message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Hello ${user.name},</h2>
        <p>We are pleased to inform you that your appointment request with Capital Autos has been approved.</p>

        <h3 style="color: #0056b3;">Appointment Details:</h3>
        <ul>
          <li><strong>Subject:</strong> ${appointment.subject}</li>
          <li><strong>Car Name:</strong> ${appointment.carName}</li>
          <li><strong>Car Number:</strong> ${appointment.carNumber}</li>
          <li><strong>Requested Date:</strong> ${appointment.requestedDate}</li>
          <li><strong>Issued Date/Time:</strong> ${appointment.issuedDate}</li>
          <li><strong>Status:</strong> Approved</li>
        </ul>

        <h3 style="color: #0056b3;">Manager Note:</h3>
        <p>${additionalNote}</p>

        <p>Please arrive at the workshop on time with your vehicle. Our team will be ready to assist you with your car service.</p>

        <p>For any questions or further assistance, please feel free to reach out to us.</p>

        <p>Best Regards,</p>
        <p><strong>Capital Autos Team</strong></p>
      </div>
    `;

    emailSubject = "Appointment Approved - Capital Autos";
    sendTo = user.email;
    sentFrom = process.env.EMAIL_USER;
  }

  if (status === "Completed") {
    message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Hello ${user.name},</h2>
        <p>We are pleased to inform you that your appointment with Capital Autos has been successfully completed.</p>

        <h3 style="color: #0056b3;">Appointment Details:</h3>
        <ul>
          <li><strong>Subject:</strong> ${appointment.subject}</li>
          <li><strong>Car Name:</strong> ${appointment.carName}</li>
          <li><strong>Car Number:</strong> ${appointment.carNumber}</li>
          <li><strong>Requested Date:</strong> ${appointment.requestedDate}</li>
          <li><strong>Issued Date/Time:</strong> ${appointment.issuedDate}</li>
          <li><strong>Status:</strong> Completed</li>
        </ul>

        <h3 style="color: #0056b3;">Manager Note:</h3>
        <p>${additionalNote}</p>

        <p>We hope you are satisfied with our service. Your feedback is valuable to us and helps us improve our services.</p>
        <p>Kindly take a moment to share your experience with us by leaving a review through My Appointments page in profile menu.</p>
        <p>For any questions or further assistance, please feel free to reach out to us.</p>

        <p>Best Regards,</p>
        <p><strong>Capital Autos Team</strong></p>
      </div>
    `;

    emailSubject = "Appointment Completed - Capital Autos";
    sendTo = user.email;
    sentFrom = process.env.EMAIL_USER;
  }

  try {
    await sendEmail(emailSubject, message, sendTo, sentFrom);
  } catch (error) {
    res.status(500);
    throw new Error("Email could not be Sent. Please try again !");
  }

  res.status(200).json(updatedAppointment);
});

module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointment,
  getLatestAppointments,
  getAllAppointments,
  updateAppointmentStatus,
};
