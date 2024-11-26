const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = 8080 || process.env.PORT;

app.use("/", router);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected successfully");
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((err) => {
    console.error("Some error occured");
  });
