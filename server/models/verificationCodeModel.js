const mongoose = require("mongoose");

const VerificationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return new Date(+this.createdAt + 60 * 60 * 1000); // Expires in 1 hour
    },
  },
});

const VerificationCode = mongoose.model(
  "VerificationCode",
  VerificationCodeSchema
);

module.exports = VerificationCode;
