const router = require("express").Router();
const QuizModel = require("../models/QuizModel");

router.get("/get-questions", async (req, res) => {
  try {
    // Fetch random 10 questions from QuizModel
    const randomQuestions = await QuizModel.aggregate([
      { $sample: { size: 10 } },
    ]);

    res.json({ questions: randomQuestions });
  } catch (error) {
    console.error("Error fetching random questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
