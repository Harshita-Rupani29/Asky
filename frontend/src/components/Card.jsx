import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiMenuKebab, CiSaveDown1, CiEdit } from "react-icons/ci";
import { MdOutlineReportProblem, MdOutlineDeleteSweep, MdOutlineInsertComment } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { AuthContext } from "../utils/context-API";
import useHttp from "../utils/hooks/http-hook";

import Loader from "./Loader";
import AnswersList from "./AnswerList";
import SharePopup from "./Share";
import { getRelativeTimestamp } from "../utils/timeChange";
const Card = ({ data, questionStateHandler }) => {
  const { sendRequest, error, isLoading } = useHttp();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    _id: id,
    author,
    date_posted,
    level,
    subject,
    title,
    description,
    postImage,
    isEdited,
    answers,
    image: questionImage,
  } = data;

  const [isMine, setIsMine] = useState(false);
  const [showCardOptions, setCardOptions] = useState(false);
  const [isDescripExpanded, setIsDescripExpanded] = useState(false);
  const [isAnswersOpen, setIsAnswerOpen] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const cardOptionsRef = useRef(null);
  const imageURL = `${import.meta.env.VITE_ASSETS_URL}${questionImage}`;
  const profileImage = `${import.meta.env.VITE_ASSETS_URL}${author.profile_image}`;
  const shareUrl = `${import.meta.env.VITE_APP_URL}/question/${id}`;

  useEffect(() => {
    if (author._id === userId) setIsMine(true);
  }, [author._id, userId]);

  const toggleCardOptions = () => setCardOptions((prev) => !prev);
  const toggleDescrip = () => setIsDescripExpanded((prev) => !prev);
  const toggleAnswer = () => {
    setIsAnswerOpen((prev) => !prev);
    fetchAnswer();
  };
  const toggleSharePopup = () => setShowSharePopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardOptionsRef.current && !cardOptionsRef.current.contains(event.target)) {
        setCardOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const date = getRelativeTimestamp(date_posted);
  const handleDelete = async () => {
    toggleCardOptions();
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/questions/${id}`, "DELETE");
        if (response.message === "successfully deleted!") {
          questionStateHandler("delete", id);
          toast.success("Question deleted successfully!");
        }
      } catch (error) {
        toast.error("Failed to delete question. Please try again.");
      }
    }
  };

  const handleEdit = () => {
    if (!isLoggedIn) return toast.info("Please login first!");
    navigate(`/ask?edit=true&id=${id}&title=${title}&description=${description}&level=${level}&subject=${subject}&image=${questionImage}`);
  };

  const handleSaveQuestion = async () => {
    if (!isLoggedIn) return toast.info("Please login first!");
    try {
      const response = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/questions/save/${id}/${userId}`, "GET");
      toggleCardOptions();
      toast.success(response.message);
    } catch {
      toast.error("Failed to save question. Please try again.");
      toggleCardOptions();
    }
  };

 const submitAnswer = async (content) => {
    if (!isLoggedIn) return toast.info("Please login to answer a question!");
    try {
      const response = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/answer/${userId}/${id}`,
        "POST",
        JSON.stringify({ content: content }), 
        { "Content-Type": "application/json" }
      );

      toast.success("Question Answered!");
      setAnswerInput(""); 
      setQuestionAnswers(prevAnswers => [...prevAnswers, response.answer]);

    } catch (e) {
      console.error("Submit Answer Frontend Error:", e);
      toast.error("Failed to submit answer.");
    }
  };

  const fetchAnswer = async () => {
    try {
      const response = await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/answer/${id}`, "GET");
      
       setQuestionAnswers(response.answers);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-3xl min-w-[330px] bg-gray-50 rounded-2xl shadow-md p-4 mb-6 relative">
      {isAnswersOpen && (
        <AnswersList
          answers={questionAnswers}
          onClose={toggleAnswer}
          isLoading={isLoading}
          submitAnswer={submitAnswer}
          
          answerInput={answerInput} 
          setAnswerInput={setAnswerInput} 
        />
      )}

      {showCardOptions && isLoggedIn && (
        <div ref={cardOptionsRef} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-4 w-64 space-y-3 text-center">
            <button onClick={handleSaveQuestion} className="flex items-center gap-2 justify-center">
              <CiSaveDown1 /> Save/Unsave
            </button>
            {isMine ? (
              <>
                <button onClick={handleEdit} className="flex items-center gap-2 justify-center">
                  <CiEdit /> Edit
                </button>
                <button onClick={handleDelete} className="flex items-center gap-2 justify-center text-red-600">
                  <MdOutlineDeleteSweep /> Delete
                </button>
              </>
            ) : (
              <button className="flex items-center gap-2 justify-center text-red-500">
                <MdOutlineReportProblem /> Report
              </button>
            )}
            <hr />
            <button onClick={toggleCardOptions} className="text-gray-500">Cancel</button>
          </div>
        </div>
      )}

      {showSharePopup && <SharePopup shareUrl={shareUrl} title={title} description={description} toggleSharePopup={toggleSharePopup} />}

      {isLoading && <Loader />}

      {/* Header */}
      <div className="flex items-center px-4">
        <div className="relative w-[70px] h-[70px] rounded-full border-2 border-gray-300 overflow-hidden mr-3">
          <img src={author.profile_image ? profileImage : ('assets/avatar.webp')} alt="user" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col ml-2">
          <span className="font-bold text-indigo-600 text-sm">{author.firstName}</span>
          <span className="text-sm text-gray-500">{date}</span>
          <span className="text-base text-gray-600">{level} • {subject}</span>
        </div>
        <div className="ml-auto text-xl cursor-pointer">
          <CiMenuKebab onClick={toggleCardOptions} />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-4">
        <div className="text-lg font-bold">{title}</div>
        <div className="mt-2 text-gray-700 text-sm">
          {isDescripExpanded ? description : `${description.slice(0, 150)}`}
          {description.length > 150 && (
            <span onClick={toggleDescrip} className="text-indigo-500 ml-1 cursor-pointer">
              {!isDescripExpanded ? "... More" : " Less"}
            </span>
          )}
        </div>
        {questionImage && (
          <div className="mt-4 rounded-xl max-h-[350px] overflow-hidden flex items-center justify-center">
            <img src={imageURL} alt="question" className="w-full h-auto object-contain" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-around my-4">
        <span className="flex items-center cursor-pointer" onClick={toggleAnswer}>
          <MdOutlineInsertComment className="mr-1" />
          <p className="text-sm text-gray-700">{answers?.length || 0} answers</p>
        </span>
        <span className="flex items-center cursor-pointer" onClick={toggleSharePopup}>
          <FaShareSquare className="mr-1" />
        </span>
      </div>

      {/* Comment section */}
      <div className="flex items-center gap-2 px-4">
        <input
          type="text"
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="Add a comment"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:bg-indigo-300"
          disabled={!answerInput}
          onClick={submitAnswer}
        >
          Send
        </button>
      </div>

      {isEdited && <p className="text-xs text-gray-400 absolute bottom-1 right-4">Edited</p>}
    </div>
  );
};

export default Card;