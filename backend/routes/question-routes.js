const express = require("express");
const Router = express.Router();

const fileUpload = require("../middleware/file-upload");
const questionController = require("../controllers/question-controller");
const {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  saveQuestion,
  singleQuestion,
} = questionController;

const checkAuth = require("../middleware/check-auth");

Router.use(checkAuth);
Router.post("/:UID", fileUpload.single("image"), newQuestion);
Router.get("/save/:QID/:UID", saveQuestion);
Router.get("/single/:QID", singleQuestion);
Router.get("/:page", getQuestions);
Router.patch("/:QID", fileUpload.single("image"), editQuestion);
Router.delete("/:QID", deleteQuestion);

module.exports = Router;
