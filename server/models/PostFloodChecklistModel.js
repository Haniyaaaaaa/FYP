const mongoose = require('mongoose');
const { UserModel } = require("./UserModel");

// Define checklist item schema
const checklistItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Define checklist schema
const PostFloodChecklistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    items: [checklistItemSchema]
});

// Create checklist model
module.exports = mongoose.model('postflood-checklist', PostFloodChecklistSchema);


