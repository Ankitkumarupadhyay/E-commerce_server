const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
   
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;