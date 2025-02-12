import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css"; // ✅ 스타일 적용

function Quiz({ quizData }) {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (selectedTypes) => {
    if (answers.length + 1 === quizData.length) {
      navigate("/result", { state: { answers: [...answers, selectedTypes[0]] } });
    } else {
      setAnswers([...answers, selectedTypes[0]]);
    }
  };

  return (
    <div className="quiz-container">
      {answers.length < quizData.length ? (
        <div className="quiz-card">
          <h2 className="quiz-title">{quizData[answers.length].question}</h2>
          <div className="quiz-options">
            {quizData[answers.length].options.map((option, index) => (
              <button key={index} className="quiz-option" onClick={() => handleAnswer(option.types)}>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>결과 페이지로 이동 중...</p>
      )}
    </div>
  );
}

export default Quiz;