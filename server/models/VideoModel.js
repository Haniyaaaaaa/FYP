const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  videoLink: {
    type: String,
    required: true,
  },
  videoTitle: {
    type: String,
    required: true,
  },
  videoDescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // Define date property as Date type
    default: Date.now, // Optional: Set default value to current date
  },
});

VideoSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.date) {
      ret.date = ret.date.toISOString().slice(0, 10);
    }
    return ret;
  },
});

module.exports = mongoose.model("videos", VideoSchema);
