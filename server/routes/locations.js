const express = require("express");
const router = express.Router();
const Location = require("../models/LocationModel");

router.get("/get-locations", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
