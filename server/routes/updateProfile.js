const router = require("express").Router();
const { UserModel, validate } = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");
const crypto = require("crypto");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcryptjs");

//get user details from database
router.post("/", async (req, res) => {
  try {

    //userId sent by client
    const { userId } = req.body;

    const user = await UserModel.findById(userId);

    // Check if the user was not found
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Extract relevant user information
    const { firstName, lastName, email } = user;

    // Send the user information as a response
    res.status(200).send({ firstName, lastName, email });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/rename", async (req, res) => {
  const { userToken, newFirstName, newLastName } = req.body;

  let resultUpd = await UserModel.updateOne(
    { _id: userToken },
    {
      $set: { firstName: newFirstName, lastName: newLastName }
    }
  )

  res.status(200).send({ message: "Updated successfully" });

});
//update password
router.post("/password", async (req, res) => {

  //getting from client
  const { userToken, currentPassword, updPassword } = req.body;

  const user = await UserModel.findOne({ _id: userToken });

  //compare user provided current password with password in db
  const validPassword = await bcrypt.compare(currentPassword, user.password);
  if (!validPassword) {
    return res.status(401).send({ message: "Incorrect current password" });
  }
  //validation check for password
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

  if (!passwordRegex.test(updPassword)) {
    return res.status(401).send({ message: "Password must contain at least 8 characters, one uppercase letter, one symbol, and be alphanumeric." });
    return;
  }

  //hash new password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(updPassword, salt);

  //update password
  let resultUpd = await UserModel.updateOne(
    { _id: userToken },
    {
      $set: { password: hashPassword }
    }
  )
  res.status(200).send({ message: "Updated successfully" });

});
//delete account
router.post("/delete", async (req, res) => {

  //getting from client
  const { userToken, delPassword } = req.body;

  const user = await UserModel.findOne({ _id: userToken });

  //compare user provided current password with password in db
  const validPassword = await bcrypt.compare(delPassword, user.password);
  if (!validPassword) {
    return res.status(401).send({ message: "Incorrect current password" });
  }

  //delete password
  let resultUpd = await UserModel.deleteOne(
    { _id: userToken }

  )
  res.status(200).send({ message: "Deleting account successfully" });

});

//always export this line, otherwise it will throw error
module.exports = router;