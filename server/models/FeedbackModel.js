const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

FeedbackSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.date = ret.date.toISOString().slice(0, 10); // Change the format as needed
        return ret;
    }
});

module.exports = mongoose.model("feedbacks", FeedbackSchema);