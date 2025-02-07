import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>연애 성격 테스트</h1>
      <p>당신의 연애 스타일을 알아보세요!</p>
      <Link to="/quiz">
        <button>테스트 시작</button>
      </Link>
    </div>
  );
}

export default Home;