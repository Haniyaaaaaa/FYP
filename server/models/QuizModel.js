const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({

    questionText: {
        type: String,
        required: true,
    },
    choices: [
        {
            type: String,
            required: true,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("quiz", QuizSchema);

