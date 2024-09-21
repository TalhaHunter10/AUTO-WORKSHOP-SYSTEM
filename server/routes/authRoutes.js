const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  registerUser,
  logOut,
  loginStatus,
  registerWM,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  login,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register_user", registerUser);
router.post("/email_verification", verifyEmail);
router.post("/login", login);
router.get("/logout", protect, logOut);
router.get("/loggedin", loginStatus);
router.post("/register_wm", registerWM);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
