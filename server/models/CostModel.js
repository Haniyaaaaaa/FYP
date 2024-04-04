const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelCostSchema = new Schema({
  district: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("modelcosts", modelCostSchema);
