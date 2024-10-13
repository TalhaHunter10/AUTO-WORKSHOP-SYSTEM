const asyncHandler = require("express-async-handler");
const WM = require("../models/wmModel");

const getManagers = asyncHandler(async (req, res) => {
  try {
    const wmManagers = await WM.find({}).skip(1).select("-password -status");
    res.status(200).json(wmManagers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteManager = asyncHandler(async (req, res) => {
  try {
    const manager = await WM.findByIdAndDelete(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getManagers, deleteManager };
