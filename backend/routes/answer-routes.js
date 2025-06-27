const express = require("express");
const ansRouter = express.Router();

const { getAnswers, postAnswer } = require("../controllers/answer-controller");

const { upvote, downvote } = require("../controllers/upvote_downVote");
// const checkAuth = require("../middleware/check-auth");

// ansRouter.use(checkAuth);
ansRouter.post("/:UID/:QID", postAnswer);
ansRouter.get("/:QID", getAnswers);

ansRouter.post("/upvote/:AID/:UID", upvote);
ansRouter.post("/downvote/:AID/:UID", downvote);

module.exports = ansRouter;
