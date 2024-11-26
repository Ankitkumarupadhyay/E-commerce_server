const bcrypt = require("bcrypt");
const userModel = require("../models/userModels");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      res.cookie("token", token);
      res.json({
        message: "Login successful",
        user:user,
        success: true,
        error: false,
        token: token,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json({ message: err.message, error: true, success: false });
  }
};
