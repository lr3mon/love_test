import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const answers = location.state?.answers || [];

  // 선택된 유형 개수 세기
  const typeCount = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // 가장 많이 선택된 유형 찾기
  const mostFrequentType = Object.keys(typeCount).reduce((a, b) =>
    typeCount[a] > typeCount[b] ? a : b
  );

  return (
    <div className="container">
      <h1>당신의 연애 유형은?</h1>
      <h2>{mostFrequentType ? mostFrequentType : "결과 없음"} ❤️</h2>
      <p>당신의 연애 스타일을 친구들과 공유해보세요!</p>

      {/* 다시 테스트하기 버튼 */}
      <Link to="/">
        <button>다시 하기</button>
      </Link>

      {/* 외부 링크 버튼 */}
      <a href="https://couple.dbcart.net/" target="_blank" rel="noopener noreferrer">
        <button className="external-link-button">내 연인과의 궁합 알아보기</button>
      </a>
    </div>
  );
}

export default Result;