const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getUserData, updateUser } = require("../controllers/userController");
const router = express.Router();

router.get("/getuser", protect, getUserData);
router.put("/update", protect, updateUser);

module.exports = router;

