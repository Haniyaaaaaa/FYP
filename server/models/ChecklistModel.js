const mongoose = require('mongoose');
const { UserModel } = require("../models/UserModel");

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
const ChecklistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    items: [checklistItemSchema]
});

// Create checklist model
const Checklist = mongoose.model('checklist', ChecklistSchema);

module.exports = Checklist;
