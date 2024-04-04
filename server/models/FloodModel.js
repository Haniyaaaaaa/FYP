const mongoose = require("mongoose");

// Define the FloodResilientModel schema
const floodModelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
const FloodModel = mongoose.model("floodmodels", floodModelSchema);

// Create the FloodResilientModel model

module.exports = FloodModel;
