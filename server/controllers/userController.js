const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUserData = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const userData = await User.findById(user).select("-password");
  if (userData) {
    res.status(200).json(userData);
  } else {
    res
      .status(404)
      .json({ message: "User not found", status: 404, type: "notFound" });
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const userData = await User.findById(user);
  if (userData) {
    userData.name = req.body.name || userData.name;
    userData.phoneno = req.body.phoneno || userData.phoneno;
    const updatedUser = await userData.save();
    res.status(200).json(updatedUser);
  } else {
    res
      .status(404)
      .json({ message: "User not found", status: 404, type: "notFound" });
    throw new Error("User not found");
  }
});

module.exports = { getUserData, updateUser };
