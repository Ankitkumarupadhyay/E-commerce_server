const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
    },
    role: {
      type: String,
      default: "GENERAL",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
