const mongoose = require("mongoose");

const financialSchema = mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Salary", "Sales", "Investment", "Rent", "Bills", "Supplies"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Online", "Other"],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Financial = mongoose.model("Financial", financialSchema);
module.exports = Financial;
