require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

const userRoutes = require("./routes/user-routes");
const questionRoutes = require("./routes/question-routes");
const answerRoutes = require("./routes/answer-routes");
const HttpError = require("./models/http-error");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "build")));

const uploadsDir = path.join(__dirname, "uploads", "images");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory: ${uploadsDir}`);
}
app.use("/uploads/images", express.static(uploadsDir));

app.use("/api/users", userRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/questions", questionRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = 500;
  console.error("Caught error in app.js middleware:", error);
  console.error("Error message:", error.message);
  console.error("Error code:", error.code);
  console.error("Error status:", error.status);
  if (typeof error.code === "number" && error.code >= 100 && error.code < 600) {
    statusCode = error.code;
  } else if (
    typeof error.status === "number" &&
    error.status >= 100 &&
    error.status < 600
  ) {
    statusCode = error.status;
  } else if (error instanceof HttpError) {
    statusCode = error.code || error.status || 500;
  }

  res.status(statusCode);
  res.json({ message: error.message || "An unknown error occurred." });
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
