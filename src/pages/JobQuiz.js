// src/pages/JobQuiz.js
import React from "react";
import Quiz from "../components/Quiz";
import { jobTestData } from "../data/quizData";

function JobQuiz() {
  return <Quiz quizData={jobTestData} />;
}

export default JobQuiz;