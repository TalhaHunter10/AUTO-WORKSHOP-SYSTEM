const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  addPart,
  getAllParts,
  deletePart,
  updatePart,
} = require("../controllers/partsController");

const router = express.Router();

router.post("/add", protect, addPart);
router.get("/getall", getAllParts);
router.delete("/deletepart/:id", protect, deletePart);
router.put("/updatepart/:id", protect, updatePart);

module.exports = router;
