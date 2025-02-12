// src/components/Quiz.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz({ quizData }) {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (selectedTypes) => {
    if (answers.length + 1 === quizData.length) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/result", { state: { answers: [...answers, selectedTypes[0]] } });
      }, 2000);
    } else {
      setAnswers([...answers, selectedTypes[0]]);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>결과를 분석 중입니다... ⏳</p>
      ) : (
        <div>
          <h2>{quizData[answers.length].question}</h2>
          {quizData[answers.length].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option.types)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz;