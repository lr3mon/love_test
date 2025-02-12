// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestList from "./components/TestList";
import LoveQuiz from "./pages/LoveQuiz";
import JobQuiz from "./pages/JobQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestList />} />
        <Route path="/tests/love" element={<LoveQuiz />} />
        <Route path="/tests/job" element={<JobQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;