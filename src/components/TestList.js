// src/components/TestList.js
import { Link } from "react-router-dom";
import "../styles/TestList.css"; // ✅ 스타일 적용

function TestList() {
  return (
    <div className="test-list-container">
      <h1 className="test-list-title">🔮 다양한 테스트를 만나보세요!</h1>
      <div className="test-list-grid">
        {/* 연애 성격 테스트 */}
        <Link to="/tests/love" className="test-card">
          💖 연애 성격 테스트
        </Link>

        {/* 직업 성격 테스트 */}
        <Link to="/tests/job" className="test-card">
          💼 직업 성격 테스트
        </Link>
      </div>
    </div>
  );
}

export default TestList;