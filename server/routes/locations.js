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

router.delete("/delete-sqft-cost", async (req, res) => {
  try {
    const { districtName, locationName, locationId } = req.body;

    const deletedCostEntry = await CostModel.findByIdAndDelete(locationId);

    if (!deletedCostEntry) {
      return res.status(404).json({ error: "Cost entry not found" });
    }

    const district = await Location.findOne({ district: districtName });

    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }

    const locationIndex = district.locations.findIndex(
      (loc) => loc === locationName
    );

    if (locationIndex === -1) {
      return res.status(404).json({ error: "Location not found" });
    }

    district.locations.splice(locationIndex, 1);

    await district.save();

    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/update-location-cost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedLocation, location, cost, districtName } = req.body;

    const updatedLocationCost = await CostModel.findByIdAndUpdate(
      id,
      { location, cost },
      { new: true }
    );

    if (!updatedLocationCost) {
      return res.status(404).json({ error: "Location cost entry not found" });
    }

    const district = await Location.findOne({ district: districtName });
    const locationIndex = district.locations.findIndex(
      (loc) => loc === selectedLocation.location
    );

    if (locationIndex === -1) {
      return res.status(404).json({ error: "Location not found" });
    }

    district.locations[locationIndex] = location;

    await district.save();

    res.json({
      message: "Location cost updated successfully",
      location: updatedLocationCost,
    });
  } catch (error) {
    console.error("Error updating location cost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
