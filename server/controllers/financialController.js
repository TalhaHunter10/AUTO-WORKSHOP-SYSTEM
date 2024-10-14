const asyncHandler = require("express-async-handler");
const Financial = require("../models/FinancialModel");

const createFinancial = asyncHandler(async (req, res) => {
  const {
    transactionType,
    amount,
    date,
    category,
    paymentMethod,
    description,
  } = req.body;

  if (!transactionType || !amount || !date || !category || !paymentMethod) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  const financial = new Financial({
    transactionType,
    amount,
    date,
    category,
    paymentMethod,
    description,
  });

  const createdFinancial = await financial.save();

  res.status(201).json({
    message: "Financial transaction created successfully",
    data: createdFinancial,
  });
});

const getFinancials = asyncHandler(async (req, res) => {
  const financials = await Financial.find({}).sort({ date: -1 });
  res.status(200).json(financials);
});

const deleteFinancial = asyncHandler(async (req, res) => {
  const financial = await Financial.findByIdAndDelete(req.params.id);
  if (!financial) {
    res.status(404);
    throw new Error("Financial transaction not found");
  }
  res
    .status(200)
    .json({ message: "Financial transaction deleted successfully" });
});

const getFinancialById = asyncHandler(async (req, res) => {
  const financial = await Financial.findById(req.params.id);
  if (!financial) {
    res.status(404);
    throw new Error("Financial transaction not found");
  }
  res.status(200).json(financial);
});

const updateFinancial = asyncHandler(async (req, res) => {
  const financial = await Financial.findById(req.params.id);

  if (!financial) {
    res.status(404);
    throw new Error("Financial transaction not found");
  }

  financial.transactionType =
    req.body.transactionType || financial.transactionType;
  financial.amount = req.body.amount || financial.amount;
  financial.date = req.body.date || financial.date;
  financial.category = req.body.category || financial.category;
  financial.paymentMethod = req.body.paymentMethod || financial.paymentMethod;
  financial.description = req.body.description || financial.description;

  const updatedFinancial = await financial.save();

  res.status(200).json({
    message: "Financial transaction updated successfully",
    data: updatedFinancial,
  });
});

module.exports = {
  createFinancial,
  getFinancials,
  deleteFinancial,
  getFinancialById,
  updateFinancial,
};
