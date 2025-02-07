import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const answers = location.state?.answers || [];

  const getResultType = () => {
    if (answers.includes("신뢰")) return "현실적인 연애";
    if (answers.includes("설렘")) return "로맨틱 연애";
    if (answers.includes("편안함")) return "친구 같은 연애";
    return "자유로운 연애";
  };

  return (
    <div className="container">
      <h1>당신의 연애 스타일은?</h1>
      <h2>{getResultType()}</h2>
      <p>당신의 연애 스타일을 친구들과 공유하세요!</p>
      <Link to="/">
        <button>다시 하기</button>
      </Link>
    </div>
  );
}

export default Result;