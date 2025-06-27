import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { AuthContext } from "../utils/context-API";

const QuestionsList = ({ data }) => {
  const { userId } = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  function updateQuestionState(type, QID, data) {
    const questionIndex = filteredData.findIndex(
      (question) => question._id === QID
    );

    if (questionIndex === -1) {
      console.error("Question not found");
      return;
    }

    const updatedQuestions = [...filteredData];

    switch (type) {
      case "delete":
        updatedQuestions.splice(questionIndex, 1);
        break;

       case "upvote": {
  const answersCopy = [...updatedQuestions[questionIndex].answers];
  const answerIdx = answersCopy.findIndex(
    (answer) => answer._id === data.answerId
  );
  if (answerIdx !== -1) {
    const answer = { ...answersCopy[answerIdx] };
    if (answer.upVote.includes(userId)) {
      answer.upVote = answer.upVote.filter((id) => id !== userId);
    } else {
      answer.upVote = [...answer.upVote, userId];
      answer.downVote = answer.downVote.filter((id) => id !== userId);
    }
    answersCopy[answerIdx] = answer;
    updatedQuestions[questionIndex].answers = answersCopy;
  }
  break;
}

case "downvote": {
  const answersCopy = [...updatedQuestions[questionIndex].answers];
  const answerIdx = answersCopy.findIndex(
    (answer) => answer._id === data.answerId
  );
  if (answerIdx !== -1) {
    const answer = { ...answersCopy[answerIdx] };
    if (answer.downVote.includes(userId)) {
      answer.downVote = answer.downVote.filter((id) => id !== userId);
    } else {
      answer.downVote = [...answer.downVote, userId];
      answer.upVote = answer.upVote.filter((id) => id !== userId);
    }
    answersCopy[answerIdx] = answer;
    updatedQuestions[questionIndex].answers = answersCopy;
  }
  break;
}

      case "addanswer":
        updatedQuestions[questionIndex].answers.push(data);
        break;

      default:
        console.error("Invalid type");
        return;
    }

    setFilteredData(updatedQuestions);
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 px-4 py-6">
      {filteredData == null || filteredData.length === 0 ? (
        <h2 className="text-lg text-gray-600 mt-4">Nothing found!</h2>
      ) : (
        filteredData.map((d) => (
          <Card
            key={d._id}
            data={d}
            questionStateHandler={updateQuestionState}
          />
        ))
      )}
    </div>
  );
};

export default QuestionsList;
