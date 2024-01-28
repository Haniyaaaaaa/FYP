const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CropSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    crop: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("crops", CropSchema);
