const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");

const createReview = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { appointmentId, review } = req.body;
  if (!appointmentId || !review) {
    res.status(400).json({
      message: "All fields are required",
      status: 400,
      type: "required",
    });
    throw new Error("All fields are required");
  }

  const existingReview = await Review.findOne({
    userId: user,
    appointmentId: appointmentId,
  });

  if (existingReview) {
    res.status(400).json({
      message: "Review already exists",
      status: 400,
      type: "alreadyExists",
    });
    throw new Error("A review for this appointment already exists.");
  }

  const newReview = new Review({
    userId: user,
    appointmentId,
    review,
    createdAt: new Date(),
  });

  try {
    const createdReview = await newReview.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create review");
  }
});

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate({
      path: "userId",
      select: "name createdAt",
    })
    .populate({
      path: "appointmentId",
      select: "subject",
    })
    .sort({ createdAt: -1 });

  res.json(reviews);
});

module.exports = { createReview, getAllReviews };
