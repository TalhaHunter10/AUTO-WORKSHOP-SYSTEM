const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const Financial = require("../models/FinancialModel");

const getStats = expressAsyncHandler(async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const oneYearAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 11,
      1
    ); // Start of 12 months ago

    const stats = {
      totalAppointments: 0,
      totalAppointmentsCompleted: 0,
      totalAppointmentsPending: 0,
      totalAppointmentsRejected: 0,
      totalAppointmentsDiscarded: 0,
      totalusers: 0,
      totalusersincreasepercentagethismonth: 0,
      newusers: 0,
      newusersincreasepercentagethisweek: 0,
      monthlyIncomeExpense: [],
      yearlyIncomeExpense: [],
    };

    // Existing code for appointments and user stats
    stats.totalAppointments = await Appointment.countDocuments();
    stats.totalAppointmentsCompleted = await Appointment.countDocuments({
      status: "Completed",
    });
    stats.totalAppointmentsPending = await Appointment.countDocuments({
      status: "Pending",
    });
    stats.totalAppointmentsRejected = await Appointment.countDocuments({
      status: "Rejected",
    });
    stats.totalAppointmentsDiscarded = await Appointment.countDocuments({
      status: "Discarded",
    });
    stats.totalusers = await User.countDocuments({ status: "user" });

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const startOfLastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );

    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
      status: "user",
    });
    const newUsersLastMonth = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: startOfMonth },
      status: "user",
    });

    if (newUsersLastMonth > 0) {
      stats.totalusersincreasepercentagethismonth =
        ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100;
    }

    const startOfWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    const newUsersThisWeek = await User.countDocuments({
      createdAt: { $gte: startOfWeek },
      status: "user",
    });

    const pastFourWeeksUsers = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: startOfMonth },
      status: "user",
    });
    const weeklyAverageLastMonth = pastFourWeeksUsers / 4;

    if (weeklyAverageLastMonth > 0) {
      stats.newusersincreasepercentagethisweek =
        ((newUsersThisWeek - weeklyAverageLastMonth) / weeklyAverageLastMonth) *
        100;
    }

    stats.newusers = newUsersThisWeek;

    // Aggregate monthly income and expense data
    stats.monthlyIncomeExpense = await Financial.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, type: "$transactionType" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Aggregate yearly income and expense data
    stats.yearlyIncomeExpense = await Financial.aggregate([
      {
        $match: {
          date: {
            $gte: oneYearAgo,
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            ), // Start of the next month
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$transactionType",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = { getStats };
