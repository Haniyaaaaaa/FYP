const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/, // Only letters allowed
      },
      lastName: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/, // Only letters allowed
      },
      email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email format
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        
      },
      role: {
        type: String,
        required: true,
        enum: ['farmer', 'normal victim'], // Enumerated values
      },
      verified: {
        type: Boolean,
        default: false
      },

});

// generating token for for saving userId
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, 
  { expiresIn: '7d' }
  );
  return (token, {userId: this._id})  ;
};

const UserModel = mongoose.model("User", UserSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
    role: Joi.string().valid('farmer', 'normal victim').required().label("Role"),
	});

	return schema.validate(data);
  
};

module.exports = { UserModel, validate };