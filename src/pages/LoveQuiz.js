// src/pages/LoveQuiz.js
import React from "react";
import Quiz from "../components/Quiz";
import { loveTestData } from "../data/quizData";

function LoveQuiz() {
  return <Quiz quizData={loveTestData} />;
}

export default LoveQuiz;