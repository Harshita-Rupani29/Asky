import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AuthContext } from "../utils/context-API";
import useHttp from "../utils/hooks/http-hook";

const AnswerCard = ({ answerData }) => {
  const { sendRequest } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const {
    _id: answerId,
    content,
    date_posted,
    author,
    upVote: upvotes,
    downVote: downvotes,
  } = answerData;

  const [upvoteState, setUpvoteState] = useState({
    isUpvoted: upvotes.includes(userId),
    upvotesLength: upvotes.length,
  });

  const [downvoteState, setDownvoteState] = useState({
    isDownvoted: downvotes.includes(userId),
    downvotesLength: downvotes.length,
  });

  const profileURL = `${import.meta.env.VITE_ASSETS_URL}${author.profile_image}`;

  useEffect(() => {
    setUpvoteState({
      isUpvoted: upvotes.includes(userId),
      upvotesLength: upvotes.length,
    });
    setDownvoteState({
      isDownvoted: downvotes.includes(userId),
      downvotesLength: downvotes.length,
    });
  }, [upvotes, downvotes, userId]);

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/answer/upvote/${answerId}/${userId}`,
        "POST"
      );

      setUpvoteState((prev) => ({
        ...prev,
        isUpvoted: true,
        upvotesLength: prev.upvotesLength + 1,
      }));

      if (downvoteState.isDownvoted) {
        setDownvoteState((prev) => ({
          ...prev,
          isDownvoted: false,
          downvotesLength: prev.downvotesLength - 1,
        }));
      }

      toast.success(response.message);
    } catch {
      toast.error("Failed to upvote. Please try again.");
    }
  };

  const handleDownvote = async () => {
    if (!isLoggedIn) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/answer/downvote/${answerId}/${userId}`,
        "POST"
      );

      setDownvoteState((prev) => ({
        ...prev,
        isDownvoted: true,
        downvotesLength: prev.downvotesLength + 1,
      }));

      if (upvoteState.isUpvoted) {
        setUpvoteState((prev) => ({
          ...prev,
          isUpvoted: false,
          upvotesLength: prev.upvotesLength - 1,
        }));
      }

      toast.success(response.message);
    } catch {
      toast.error("Failed to downvote. Please try again.");
    }
  };

  const date = new Date(date_posted).toLocaleString();

  return (
    <div className="bg-white p-5 rounded-lg shadow mb-5 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={author.profile_image ? profileURL : ('/assets/avatar.webp')}
            alt="user"
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <p className="text-sm font-semibold">{author.firstName}</p>
        </div>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-800">{content}</p>
      </div>

      <div className="flex gap-6 text-sm items-center">
        <div
          onClick={handleUpvote}
          className="flex items-center cursor-pointer"
        >
          <BiUpvote
            className={`text-xl mr-1 ${
              upvoteState.isUpvoted ? "text-blue-500" : "text-gray-600"
            }`}
          />
          <span>{upvoteState.upvotesLength}</span>
        </div>

        <div
          onClick={handleDownvote}
          className="flex items-center cursor-pointer"
        >
          <BiDownvote
            className={`text-xl mr-1 ${
              downvoteState.isDownvoted ? "text-red-600" : "text-gray-600"
            }`}
          />
          <span>{downvoteState.downvotesLength}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
