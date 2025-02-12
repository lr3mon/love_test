import { Link } from "react-router-dom";
import Biorhythm from "./Biorhythm"; // ✅ 바이오리듬 추가
import "../styles/TestList.css";

function TestList() {
  return (
    <div className="test-list-container">
      <h1 className="test-list-title">🔮 다양한 테스트를 만나보세요!</h1>

      <div className="test-list-grid">
        <Link to="/tests/love" className="test-card">💖 연애 성격 테스트</Link>
        <Link to="/tests/job" className="test-card">💼 직업 성격 테스트</Link>
      </div>

      {/* ✅ 바이오리듬 컴포넌트를 아래로 이동 */}
      <Biorhythm />
    </div>
  );
}

export default TestList;