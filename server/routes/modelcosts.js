const express = require("express");
const router = express.Router();
const ModelCost = require("../models/CostModel");

router.get("/", async (req, res) => {
  try {
    const cost = await ModelCost.find({});

    res.json(cost);
  } catch (error) {
    console.error("Error fetching cost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/get-cost", async (req, res) => {
  const { district, location } = req.query;
  try {
    const cost = await ModelCost.findOne({
      district: district,
      location: location,
    });

    res.json(cost);
  } catch (error) {
    console.error("Error fetching cost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
