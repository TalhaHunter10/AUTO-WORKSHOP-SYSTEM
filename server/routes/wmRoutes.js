const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getManagers, deleteManager } = require("../controllers/wmController");

const router = express.Router();

router.get("/managers", protect, getManagers);
router.delete("/manager/:id", protect, deleteManager);

module.exports = router;
