import { Link } from "react-router-dom";

const TestList = () => {
  return (
    <div>
      <h1>테스트 목록</h1>
      <ul>
        <li><Link to="/tests/love">💖 연애 성격 테스트</Link></li>
        <li><Link to="/tests/job">💼 직업 성격 테스트</Link></li>
      </ul>
    </div>
  );
};

export default TestList;