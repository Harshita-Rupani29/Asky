require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const questionRoutes = require("./routes/question-routes");
const answerRoutes = require("./routes/answer-routes");
const httpError = require("./models/http-error");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/users", userRoutes);
app.use("/answer", answerRoutes);
app.use("/questions", questionRoutes);

app.use((req, res, next) => {
  const error = new httpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured." });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
