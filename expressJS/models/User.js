const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    password: {
      type: String,
      minLenght: [6, "Please provide a password with min length 6"],
      required: [true, "Please try a different password"],
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    about: {
      type: String,
    },

  });

  module.exports = mongoose.model("User", UserSchema);