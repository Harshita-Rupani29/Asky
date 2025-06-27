import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../utils/hooks/http-hook";
import Card from "../components/Card";
import AnswerCard from "../components/AnswerCard";
import Loader from "../components/Loader";
import Header from "../components/Header";

const SingleQuestionPage = () => {
  const { questionId } = useParams();
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions/single/${questionId}`,
          "GET"
        );
        setQuestion(response?.question);
        setAnswers(response?.question?.answers);
      } catch (error) {
        toast.error("Failed to fetch question. Please try again.");
        console.error(error);
      }
    };

    fetchQuestion();
  }, [questionId, sendRequest]);

  return (
    <div className="pt-0 px-4 bg-gray-100 min-h-screen">
      {isLoading && <Loader />}
      <Header />
      {question ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mb-6">
            <Card data={question} />
          </div>
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
            {answers.map((answer) => (
              <AnswerCard key={answer._id} answerData={answer} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-12 text-2xl text-gray-500">
          No question found with ID: {questionId}
        </p>
      )}
    </div>
  );
};

export default SingleQuestionPage;
