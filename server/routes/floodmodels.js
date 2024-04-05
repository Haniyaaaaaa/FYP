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

router.post("/save-model", async (req, res) => {
  try {
    const { url, title, desc } = req.body;

    const newModel = new VideoModel({
      url,
      title,
      desc,
    });
    await newModel.save();

    res.status(201).json({ message: "Model details saved successfully" });
  } catch (error) {
    console.error("Error saving model details:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedModel = await FloodModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating model details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedModel = await FloodModel.findByIdAndDelete(id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json({ message: "Model details deleted successfully" });
  } catch (error) {
    console.error("Error deleting model:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
