const router = require("express").Router();
const { UserModel, validate } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const TokenModel = require("../models/TokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { email, role } = req.body;

    // Check if a user with the same email and role already exists
    let user = await UserModel.findOne({ email, role });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email and role already exists!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //saving user in db
    user = await new UserModel({ ...req.body, password: hashPassword }).save();

    //creating token for this user in db
    const token = await new TokenModel({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    //verification link sent to user's email
    const url = `${process.env.BASE_URL}users/${token.userId}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    // res.send(token);
    res
      .status(201)
      .send({ message: "An Email sent to your account. Please verify." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//when user clicks on verification link sent to his email
router.get("/:id/verify/:token", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  const token = await TokenModel.findOne({
    userId: req.params.id,
    token: req.params.token,
  });

  console.log("user id is: " + req.params.id);
  console.log("token is: " + req.params.token);
  if (token) {
    console.log("present token: ");
  } else {
    console.log("absent token: ");
  }

  if (token) {
    try {
      //if either the user or the token doesnot exist in db, it means link is invalid

      if (!user) return res.status(400).send({ message: "Invalid link" });

      if (!token) return res.status(400).send({ message: "Invalid link" });

      //after the link is verified, user's verified status is set to true in db and token is removed from db

      let resultUpd = await UserModel.updateOne(
        { _id: user._id },
        {
          $set: { verified: true },
        }
      );
      console.log(resultUpd);

      let resultDel = await TokenModel.deleteOne({ token: req.params.token });

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Invalid Link" });
    }
  } else {
    res.status(200).send({ message: "Email has already been verified" });
  }
});

router.get("/get-users", async (req, res) => {
  try {
    const AllUsers = await UserModel.find({
      verified: true,
      role: { $ne: "power admin" },
    });
    res.json(AllUsers);
  } catch (error) {
    console.error("Error fetching random questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-users/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await UserModel.findById(token); // Find user by ObjectId in the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});

router.put("/edit-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: updatedUserData,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      res.json({
        message: "User not found",
      });
    } else
      res.status(201).json({
        message: "User updated successfully",
      });
  } catch (error) {
    res.json({
      error: "Error updating user",
    });
  }
});

router.delete("/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    // Perform deletion in the database
    await UserModel.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
//get friends
router.get("/:id/friends", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//get friends by id
router.patch("/:id/:friendId", async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, picturePath }) => {
        return { _id, username, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
