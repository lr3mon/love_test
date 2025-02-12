import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css"; // ✅ 스타일 적용

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || { answers: [] };

  // ✅ 가장 많이 선택된 유형 찾기 (최빈값 계산)
  const findMostFrequentType = (arr) => {
    const countMap = arr.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(countMap).reduce((a, b) => (countMap[a] > countMap[b] ? a : b));
  };

  const mostFrequentType = findMostFrequentType(answers);

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">🎉 테스트 결과</h1>
        <p className="result-text">
          당신의 성격 유형은 <span className="result-highlight">{mostFrequentType}</span> 입니다!
        </p>
        {/* ✅ 홈으로 돌아가는 버튼 */}
        <button className="home-button" onClick={() => navigate("/")}>
          🔄 처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default Result;