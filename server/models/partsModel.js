const mongoose = require("mongoose");

const partsSchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: true,
      trim: true,
    },
    partCompany: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Buffer, // Stored as binary data, effectively a byte array
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Parts = mongoose.model("Parts", partsSchema);
module.exports = Parts;
