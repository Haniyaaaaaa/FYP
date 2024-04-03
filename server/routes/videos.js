const router = require("express").Router();
const VideoModel = require("../models/VideoModel");

router.post("/save-video", async (req, res) => {
  try {
    const { videoLink, videoTitle, videoDescription } = req.body;

    const newVideo = new VideoModel({
      videoLink,
      videoTitle,
      videoDescription,
    });
    await newVideo.save();

    res.status(201).json({ message: "Video saved successfully" });
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/get-videos", async (req, res) => {
  try {
    const allVideos = await VideoModel.find({});
    res.json(allVideos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVideo = await VideoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await VideoModel.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
