const router = require("express").Router();
const FeedbackModel = require("../models/FeedbackModel");
const { UserModel } = require("../models/UserModel");

router.post("/save", async (req, res) => {
  try {
    const { feedback, rating, userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { firstName, lastName, email } = user;

    const newFeedback = new FeedbackModel({
      firstName,
      lastName,
      email,
      feedback,
      rating,
    }).save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/get-feedback", async (req, res) => {
  try {
    const AllFeedbacks = await FeedbackModel.find();
    res.json(AllFeedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
