import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questionData = [
  {
    question: "올해 당신의 연애 스타일은?",
    options: [
      { text: "💘 운명처럼 빠져든다!", types: ["운명적 사랑형", "연애 고수형"] },
      { text: "🏃 일단 도망가고 본다!", types: ["솔로 천국형", "자기관리 최우선형"] }
    ]
  },
  {
    question: "소개팅에서 첫마디는?",
    options: [
      { text: "😎 “이상형이 어떻게 되세요?” (직진형)", types: ["연애 고수형", "밀당의 고수형"] },
      { text: "🫣 “오늘 날씨 좋네요…” (소심형)", types: ["타이밍 놓치는 아쉬운형", "썸만 많고 연애는 글쎄형"] }
    ]
  },
  {
    question: "연애 상대를 고를 때 가장 중요한 것은?",
    options: [
      { text: "💰 경제력! 현실적인 게 최고지!", types: ["밀당의 고수형", "돌고 돌아 결국 연애형"] },
      { text: "💖 설렘! 가슴이 뛰어야 연애지!", types: ["운명적 사랑형", "타이밍 놓치는 아쉬운형"] }
    ]
  },
  {
    question: "애정 표현 스타일은?",
    options: [
      { text: "🥰 문자, 전화, 선물! 표현을 아끼지 않음!", types: ["연애 고수형", "돌고 돌아 결국 연애형"] },
      { text: "🙃 티 안 나게 은근슬쩍 챙겨줌!", types: ["밀당의 고수형", "썸만 많고 연애는 글쎄형"] }
    ]
  },
  {
    question: "이별 후 당신의 모습은?",
    options: [
      { text: "🍷 “그래, 한 잔 하자!” 술과 친구와 함께 극복!", types: ["썸만 많고 연애는 글쎄형", "솔로 천국형"] },
      { text: "🏋‍♂ “나만의 시간이다!” 헬스장 등록하고 자기 관리!", types: ["자기관리 최우선형", "운명적 사랑형"] }
    ]
  }
];

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  // ✅ useEffect를 사용하여 상태가 업데이트될 때만 결과로 이동
  useEffect(() => {
    if (answers.length === questionData.length) {
      setTimeout(() => {
        navigate("/result", { state: { answers } });
      }, 2000); // 2초 로딩 후 이동
    }
  }, [answers, navigate]);

  const handleAnswer = (selectedTypes) => {
    setAnswers((prevAnswers) => [...prevAnswers, selectedTypes[0]]);
  };

  return (
    <div className="container">
      {answers.length < questionData.length ? (
        <div>
          <h2>{questionData[answers.length].question}</h2>
          <div className="button-container">
            {questionData[answers.length].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option.types)}>
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