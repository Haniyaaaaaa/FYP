const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define schema
const locationSchema = new Schema({
  district: {
    type: String,
    required: true,
  },
  locations: {
    type: [String],
    required: true,
  },
});

// Define model

module.exports = mongoose.model("locations", locationSchema);
