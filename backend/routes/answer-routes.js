const express = require("express");
const ansRouter = express.Router();

const { getAnswers, postAnswer } = require("../controllers/answer-controller");

const { upvote, downvote } = require("../controllers/upvote_downVote");
const checkAuth = require("../middleware/check-auth");

ansRouter.use(checkAuth);
ansRouter.post("/:UID/:QID", postAnswer);
ansRouter.get("/:QID", getAnswers);

ansRouter.post("/upvote/:UID/:QID", upvote);
ansRouter.post("/downvote/:UID/:QID", downvote);

module.exports = ansRouter;
