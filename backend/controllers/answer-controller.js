const mongoose = require("mongoose");

const Answer = require("../models/answer.js");
const Question = require("../models/question.js");
const User = require("../models/user.js");
const HttpError = require("../models/http-error.js");

const {
  answerValidator,
} = require("../validator/question-answer-validator.js");

const postAnswer = async (req, res, next) => {
  const { error } = answerValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }
  const { UID, QID } = req.params;
  const { content } = req.body;
  let user;
  try {
    user = await User.findById(UID);
  } catch (err) {
    return next(new HttpError("User not found", 500));
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided ID,answering question failed.",
      404
    );
    return next(error);
  }
  let question;
  try {
    question = await Question.findById(QID);
  } catch (err) {
    return next(new HttpError("Question not found", 500));
  }

  if (!question) {
    const error = new HttpError(
      "Could not find a question for the provided ID, answering question failed.",
      404
    );
    return next(error);
  }

  const newAnswer = new Answer({
    content,
    author: user._id,
    question: question._id,
  });
  try {
    await newAnswer.save();
    question.answers.push(newAnswer._id);
    await question.save();
  } catch {
    const error = new HttpError("Failed answering a question", 500);
    return next(error);
  }
  res.json({
    message: "Answer posted successfully",
    answer: newAnswer,
  });
};

const getAnswers = async (req, res, next) => {
  const { QID } = req.params;

  try {
    const question = await Question.findById(QID).populate({
      path: "answers",
      populate: {
        path: "author",
        model: "User",
        select: "firstName lastName profile_image",
      },
    });

    if (!question) {
      const error = new HttpError("Could not find a question.", 404);
      return next(error);
    }

    const answers = question.answers;

    res.status(200).json({ answers });
  } catch (err) {
    const error = new HttpError(
      "Failed finding answers, please try again.",
      500
    );
    return next(error);
  }
};

module.exports = getAnswers;

module.exports = { postAnswer, getAnswers };
