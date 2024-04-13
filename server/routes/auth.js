const router = require("express").Router();
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const TokenModel = require("../models/TokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await UserModel.findOne({
      email: req.body.email,
      role: req.body.role,
    });
    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid Email, Password, or Role" });
    }
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "Invalid Email, Password, or Role" });
    }
    console.log("zzzzzzzzzzzz");

    //if user is not verified already only then send verification link to his email during login
    //bcz maybe he didnot open the ver. link during signup
    //so we let him verify again if he didnot verify during signup

    if (!user.verified) {
      //whenever a user is created, a unique token is also associated with him
      let token = await TokenModel.findOne({ userId: user._id });
      console.log(token);
      //maybe that token is expired(deleted) when we first sent him ver. link. So thats why we create new token for this user again
      if (!token) {
        token = await new TokenModel({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}users/${token.userId}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      return res
        .status(400)
        .send({
          message: "Email sent to your account. Please verify to login",
        });
    }

    //After a user logs in, you might generate a token containing the user's information, including their user ID.
    //token is then sent to the client and included in the headers of subsequent requests.

    const token = user.generateAuthToken();

    // res.status(200).send({ data: token, message: "User logged in successfully" });

    res
      .status(200)
      .send({
        data: { token: token.userId, role: user.role },
        message: "User logged in successfully",
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    role: Joi.string()
      .valid("power admin", "farmer", "normal victim")
      .required()
      .label("Role"),
  });
  return schema.validate(data);
};

module.exports = router;
