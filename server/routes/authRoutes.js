const express = require("express");
const protect = require("../middlewares/authmiddleware");
const {
  registerUser,
  logOut,
  loginUser,
  loginStatus,
  registerWM,
  loginWM,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register_user", registerUser);
router.post("/email_verification", verifyEmail);
router.post("/login_user", loginUser);
router.get("/logout", protect, logOut);
router.get("/loggedin", loginStatus);
router.post("/register_wm", registerWM);
router.post("/login_wm", loginWM);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
