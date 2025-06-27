import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import QuestionsHero from "../components/QuestionHero";
import FilterOptions from "../components/Filter";
import useHttp from "../utils/hooks/http-hook";

import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionsList from "../components/QuestionList";
const Questions = () => {
  const { sendRequest, error, isLoading, clearError } = useHttp();

  const MemoizedFilterOptions = React.memo(FilterOptions);
  const levels = [
    "ALL",
    "Primary School",
    "Secondary School",
    "University(College)",
    "Other",
  ];
  const subjects = [
    "collaborate",
    "Advice",
    "Programming",
    "Tech",
    "Chemistry",
    "Physics",
    "Accounting",
    "Maths",
    "Biology",
    "Medicine",
    "Enginnering",
    "Art",
    "Law",
    "Social studies",
    "other",
  ];

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    fetchQuestions(1);
  }, []);

  const fetchQuestions = async (
    page,
    searchQuery = "",
    levels = selectedLevels,
    subjects = selectedSubjects
  ) => {
    try {
      const filters = {
        levels: levels,
        subjects: subjects,
        search: searchQuery,
      };
      const queryParams = new URLSearchParams(filters);
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/questions/${page}?${queryParams}`;
      const response = await sendRequest(url, "GET");
      if (error) throw new Error(error);
      setQuestions(response.questions);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApplyFilters = useCallback((levels, subjects) => {
    setSelectedLevels(levels);
    setSelectedSubjects(subjects);
    setCurrentPage(1);
    fetchQuestions(1, "", levels, subjects);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setCurrentPage(1);
    fetchQuestions(1);
  }, []);

  const handleSearch = useCallback((searchQuery) => {
    setCurrentPage(1);
    fetchQuestions(currentPage, searchQuery);
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchQuestions(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchQuestions(currentPage - 1);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  return (
    <div className="w-full">
      {isLoading && <Loader />}
      <Header/>
      <QuestionsHero onSearch={handleSearch} />

      <div className="flex flex-col md:flex-row w-full px-4 md:px-8 gap-4 relative">
        <MemoizedFilterOptions
          levels={levels}
          subjects={subjects}
          selectedLevels={selectedLevels}
          selectedSubjects={selectedSubjects}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        <div className="flex flex-col items-center w-full md:w-[70%]">
          <h2 className="text-2xl font-semibold text-center text-primary my-8">
            Questions
          </h2>
          <QuestionsList data={questions} />

          <div className="flex justify-center items-center mt-8 mb-12 gap-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded text-white font-bold ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={questions.length === 0}
              className={`px-5 py-2 rounded text-white font-bold ${
                questions.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
