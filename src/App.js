import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestList from "./components/TestList";
import LoveQuiz from "./pages/LoveQuiz";
import JobQuiz from "./pages/JobQuiz";
import Result from "./pages/Result"; // ✅ 결과 페이지 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestList />} />
        <Route path="/tests/love" element={<LoveQuiz />} />
        <Route path="/tests/job" element={<JobQuiz />} />
        <Route path="/result" element={<Result />} /> {/* ✅ 결과 페이지 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;