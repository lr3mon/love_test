// src/pages/JobQuiz.js
import React from "react";
import Quiz from "../components/Quiz";
import { jobTestData } from "../data/quizData";
import "../styles/Quiz.css"; // ✅ 스타일 적용

function JobQuiz() {
  return <Quiz quizData={jobTestData} />;
}

export default JobQuiz;