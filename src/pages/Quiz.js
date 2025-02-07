import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { question: "연애에서 가장 중요한 것은?", options: ["신뢰", "설렘", "편안함", "같은 취미"] },
  { question: "데이트 스타일은?", options: ["야외 활동", "집에서 넷플릭스", "맛집 탐방", "서프라이즈 이벤트"] },
  { question: "사랑을 표현하는 방식?", options: ["말로 표현", "스킨십", "선물", "함께 있는 시간"] }
];

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (answers.length === questions.length - 1) {
      navigate("/result", { state: { answers } });
    }
  };

  return (
    <div className="container">
      {answers.length < questions.length ? (
        <div>
          <h2>{questions[answers.length].question}</h2>
          {questions[answers.length].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p>결과 페이지로 이동 중...</p>
      )}
    </div>
  );
}

export default Quiz;