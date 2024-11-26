const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSignUpController = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, profilePic } = req.body;
    if (!name) {
      throw new Error("Please enter name");
    }
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    if (!passwordHash) {
      throw new Error("Password hashing failed");
    }
    const user = new userModel({
      name,
      email,
      password: passwordHash,
      profilePic,
      role: "GENERAL",
    });

    await user.save();

    res.json({
      data: user,
      message: "User created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "ERROR : " + err.message, success: false, error: true });
  }
};

module.exports = userSignUpController;
