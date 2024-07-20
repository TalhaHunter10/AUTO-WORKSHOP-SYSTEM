const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const WM = require("../models/wmModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      res.status(401);
      throw new Error("Token not Valid!");
    }

    const user = await User.findById(verified.id).select("-password");

    if (user) {
      req.user = user;
      next();
    }

    const wm = await WM.findById(verified.id).select("-password");

    if (wm) {
      req.user = wm;
      next();
    }

    if (!user && !wm) {
      res.status(401);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = protect;
