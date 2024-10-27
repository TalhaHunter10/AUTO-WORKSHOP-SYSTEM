const Parts = require("../models/partsModel");

const addPart = async (req, res) => {
  const { partName, partCompany, quantity, price, description, image } =
    req.body;

  if (
    !partName ||
    !partCompany ||
    !quantity ||
    !price ||
    !description ||
    !image
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const newPart = new Parts({
      partName,
      partCompany,
      quantity,
      price,
      description,
      image,
    });

    await newPart.save();
    return res.status(200).json({ message: "Part added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllParts = async (req, res) => {
  try {
    const parts = await Parts.find();
    return res.status(200).json(parts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePart = async (req, res) => {
  const { id } = req.params;

  try {
    const part = await Parts.findById(id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    await Parts.findByIdAndDelete(id);
    return res.status(200).json({ message: "Part deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePart = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;

  try {
    const part = await Parts.findById(id).updateOne({ quantity, price });
    return res.status(200).json({ message: "Part updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addPart, getAllParts, deletePart, updatePart };
