const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviewController");
const router = express.Router();

router.post("/create", protect, createReview);
router.get("/all", getAllReviews);

module.exports = router;
