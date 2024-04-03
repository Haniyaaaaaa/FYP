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
});

VideoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.date = ret.date.toISOString().slice(0, 10); // Change the format as needed
    return ret;
  },
});

module.exports = mongoose.model("videos", VideoSchema);
