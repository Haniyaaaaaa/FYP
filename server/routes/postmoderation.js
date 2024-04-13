const router = require("express").Router();
const PostModModel = require("../models/PostModModel.js");
const PostModel = require("../models/PostModel.js");
const { UserModel } = require("../models/UserModel.js");

// Route to save a new complaint
router.post("/save", async (req, res) => {
  try {
    const { complaint, userId, postId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newcomplaint = new PostModModel({
      userId,
      postId,
      complaint,
    });

    await newcomplaint.save();
    res.status(201).json({ message: "Complaint saved successfully" });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Route to fetch unresponded complaints
router.get("/fetch-modposts", async (req, res) => {
  try {
    const complaints = await PostModModel.find({ responded: false })
      .populate({
        path: "userId",
        model: UserModel,
        select: "firstName lastName", // Select the fields you need
      })
      .populate({
        path: "postId",
        model: PostModel,
        select: "username description userPicturePath", // Select the fields you need
      })
      .select("_id complaint date");

    const filteredComplaints = complaints
      .filter((complaint) => {
        return (
          complaint.userId && // Check if userId exists
          complaint.userId.firstName && // Check if firstName exists
          complaint.userId.lastName && // Check if lastName exists
          complaint.postId && // Check if postId exists
          complaint.postId.username && // Check if username exists
          complaint.postId.description && // Check if description exists
          complaint.postId.userPicturePath // Check if userPicturePath exists
        );
      })
      .map((complaint) => ({
        _id: complaint._id,
        postId: complaint.postId._id,
        firstName: complaint.userId.firstName,
        lastName: complaint.userId.lastName,
        complaint: complaint.complaint,
        date: complaint.date.toISOString().slice(0, 10),
        username: complaint.postId.username,
        description: complaint.postId.description,
        userPicturePath: complaint.postId.userPicturePath,
      }));

    res.json(filteredComplaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Route to update the responded field of a complaint
router.put("/respond/:id", async (req, res) => {
  const { id } = req.params;
  const { responded } = req.body;

  try {
    const updatedComplaint = await PostModModel.findByIdAndUpdate(
      id,
      { responded },
      { new: true }
    );

    if (updatedComplaint) {
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating complaint response:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
