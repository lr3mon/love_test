import React, { useState } from "react";
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
      { text: "💖 설렘! 가슴이 뛰어야 연애지!", types: ["운명적 사랑형", "연애 고수형"] }
    ]
  },
  {
    question: "애정 표현 스타일은?",
    options: [
      { text: "🥰 문자, 전화, 선물! 표현을 아끼지 않음!", types: ["운명적 사랑형", "연애 고수형"] },
      { text: "🙃 티 안 나게 은근슬쩍 챙겨줌!", types: ["밀당의 고수형", "타이밍 놓치는 아쉬운형"] }
    ]
  },
  {
    question: "이별 후 당신의 모습은?",
    options: [
      { text: "🍷 “그래, 한 잔 하자!” 술과 친구와 함께 극복!", types: ["썸만 많고 연애는 글쎄형", "돌고 돌아 결국 연애형"] },
      { text: "🏋‍♂ “나만의 시간이다!” 헬스장 등록하고 자기 관리!", types: ["자기관리 최우선형", "솔로 천국형"] }
    ]
  },
  {
    question: "이상형이 고백했다! 당신의 반응은?",
    options: [
      { text: "😍 “YES! 이 순간을 기다렸어!”", types: ["운명적 사랑형", "연애 고수형"] },
      { text: "🫠 “잠깐만… 생각 좀 해볼게…”", types: ["타이밍 놓치는 아쉬운형", "밀당의 고수형"] }
    ]
  },
  {
    question: "연애할 때 가장 두려운 순간은?",
    options: [
      { text: "📵 연락 두절! 갑자기 사라지는 그/그녀…", types: ["운명적 사랑형", "썸만 많고 연애는 글쎄형"] },
      { text: "🥶 상대방의 가족과 첫 만남… (극강의 긴장!)", types: ["밀당의 고수형", "돌고 돌아 결국 연애형"] }
    ]
  },
  {
    question: "연애 중 갑자기 연락이 뜸해진 상대방! 당신의 반응은?",
    options: [
      { text: "🔍 탐정 모드 발동! “무슨 일 있어?” 바로 확인!", types: ["운명적 사랑형", "연애 고수형"] },
      { text: "🧘‍♀ “나도 내 삶을 즐길래~” 그냥 두고 본다!", types: ["솔로 천국형", "자기관리 최우선형"] }
    ]
  },
  {
    question: "운명의 상대를 만날 확률을 높이는 방법은?",
    options: [
      { text: "✨ 사주, 타로, 점성술… 운명적인 기운 찾기!", types: ["운명적 사랑형", "타이밍 놓치는 아쉬운형"] },
      { text: "🎭 새로운 곳에 가고, 새로운 사람들을 만난다!", types: ["연애 고수형", "돌고 돌아 결국 연애형"] }
    ]
  },
  {
    question: "올해 당신의 연애운 한마디로 표현하면?",
    options: [
      { text: "🌟 “대박! 찐사랑 온다!”", types: ["운명적 사랑형", "연애 고수형"] },
      { text: "🌪 “아무도 나를 막을 수 없어, 솔로 천국!”", types: ["솔로 천국형", "자기관리 최우선형"] }
    ]
  }
];

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (selectedTypes) => {
    setAnswers([...answers, ...selectedTypes]);
    if (answers.length === questionData.length - 1) {
      navigate("/result", { state: { answers: [...answers, ...selectedTypes] } });
    }
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