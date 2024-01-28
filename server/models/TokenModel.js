const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, //refernces a user
        required: true,
        ref: "users", //references docs of users collection (smple -> refeences user collection)
        unique: true, //each userid is unique in tokens collection, meaning each user can only have one token associated with them in this schema.
    },
    token: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 3600 }, //token deleted in 1 hour
});

module.exports = mongoose.model("tokens", TokenSchema);