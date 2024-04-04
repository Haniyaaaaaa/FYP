const express = require("express");
const router = express.Router();
const FloodModel = require("../models/FloodModel");

// Route to fetch all flood-resilient model data
router.get("/get-models", async (req, res) => {
  try {
    const models = await FloodModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
