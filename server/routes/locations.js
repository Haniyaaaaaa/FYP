const express = require("express");
const router = express.Router();
const Location = require("../models/LocationModel");
const CostModel = require("../models/CostModel");

router.get("/get-locations", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations/districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-district-location-cost", async (req, res) => {
  try {
    const districtLocations = await CostModel.find({});
    res.json(districtLocations);
  } catch (error) {
    console.error("Error fetching district-location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-districts", async (req, res) => {
  try {
    const districts = await Location.find({}, { district: 1, _id: 0 });
    res.json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-district", async (req, res) => {
  try {
    const { district, locations } = req.body;

    if (!district || !locations) {
      return res
        .status(400)
        .json({ error: "District or locations not provided" });
    }

    const newLocation = await Location.create({
      district: district,
      locations: locations,
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error adding district:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-location/:districtName/:location", async (req, res) => {
  try {
    const { districtName, location } = req.params;

    const district = await Location.findOne({ district: districtName });

    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }
    district.locations.push(location);
    await district.save();
    res.json(district);

    res.json({ message: "Location added successfully" });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-district-location-cost", async (req, res) => {
  try {
    const { districtName, location, cost } = req.body;
    res.json(req.body);

    if (!districtName || !location || !cost) {
      return res
        .status(400)
        .json({ error: "District or locations or cost not provided" });
    }

    const newCost = await CostModel.create({
      district: districtName,
      location: location,
      cost: cost,
    });

    res.status(201).json(newCost);
  } catch (error) {
    console.error("Error adding district,location,cost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
