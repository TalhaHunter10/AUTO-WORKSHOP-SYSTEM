const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { handleQuery, getMessages } = require("../controllers/chatController");

const router = express.Router();

router.post("/query", protect, handleQuery);
router.get("/messages", protect, getMessages);

module.exports = router;
