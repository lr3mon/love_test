import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const answers = location.state?.answers || [];

  const typeCount = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentType = Object.keys(typeCount).reduce((a, b) =>
    typeCount[a] > typeCount[b] ? a : b
  );

  return (
    <div className="container">
      <h1>당신의 연애 유형은?</h1>
      <h2>{mostFrequentType ? mostFrequentType : "결과 없음"} ❤️</h2>
      <p>당신의 연애 스타일을 친구들과 공유해보세요!</p>
      <Link to="/">
        <button>다시 하기</button>
      </Link>
    </div>
  );
}

export default Result;