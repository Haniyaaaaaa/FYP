const router = require("express").Router();
const Post = require("../models/PostModel");
const multer = require("multer");
const { UserModel } = require("../models/UserModel");

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "C:/Users/PMLS/Desktop/Portfolio/Flood-Resilient/FYP/client/public/assets"
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/save-post", upload.single("picture"), async (req, res) => {
  try {
    const { userId, description, picture, picturePath } = req.body;
    console.log(req);
    const user = await UserModel.findOne({ _id: userId });

    const newPost = new Post({
      userId,
      username: user.firstName,
      userPicturePath: "/a.png",
      picturePath,
      likes: {},
      comments: [],
      description: description,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const post = await Post.find().sort({ _id: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:userId/posts", async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }.sort({ _id: -1 }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params; // Post ID

    const post = await Post.findById(id, "comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* UPDATE */
router.patch("/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
router.post("/:id/comment", async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const { userId, comment } = req.body; // Comment data

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId: user._id,
      username: user.firstName,
      comment: comment,
      timestamp: new Date(),
    };

    post.comments.push(newComment);
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/:id/update", async (req, res) => {
  const { id } = req.params; // Get the post ID from the URL params
  const { description } = req.body; // Assuming you're only updating the description

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.description = description; // Update the description
    const updatedPost = await post.save(); // Save the updated post

    res.status(200).json(updatedPost); // Send back the updated post
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
