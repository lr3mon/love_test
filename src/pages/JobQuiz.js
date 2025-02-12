import React from "react";
import Quiz from "../components/Quiz";
import { jobTestData } from "../data/quizData";  // ✅ jobTestData 가져오기

function JobQuiz() {
  return <Quiz quizData={jobTestData} />;
}

export default JobQuiz;