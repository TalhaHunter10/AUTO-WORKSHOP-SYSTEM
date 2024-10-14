const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  createFinancial,
  deleteFinancial,
  updateFinancial,
  getFinancialById,
  getFinancials,
} = require("../controllers/financialController");

const router = express.Router();

router.post("/create", protect, createFinancial);
router.delete("/delete/:id", protect, deleteFinancial);
router.patch("/update/:id", protect, updateFinancial);
router.get("/get", protect, getFinancials);
router.get("/get/:id", protect, getFinancialById);

module.exports = router;
