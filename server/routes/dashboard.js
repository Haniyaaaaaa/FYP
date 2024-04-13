const router = require("express").Router();
const ComplaintModel = require("../models/ComplaintModel");
const { UserModel } = require("../models/UserModel");
const FeedbackModel = require("../models/FeedbackModel");
const PostModModel = require("../models/PostModModel");

router.get("/dashboard-records", async (req, res) => {
  try {
    const totalNormalVictims = await UserModel.countDocuments({
      role: "normal victim",
    });
    const totalFarmers = await UserModel.countDocuments({ role: "farmer" });
    const totalFeedbacks = await FeedbackModel.countDocuments();
    const totalComplaints = await ComplaintModel.countDocuments({
      responded: "false",
    });
    const totalModeration = await PostModModel.countDocuments({
      responded: "false",
    });

    res.json({
      totalNormalVictims,
      totalFarmers,
      totalFeedbacks,
      totalComplaints,
      totalModeration,
    });
  } catch (error) {
    console.error("Error fetching records for admin dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
