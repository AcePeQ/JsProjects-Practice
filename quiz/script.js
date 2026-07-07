import { questions } from "questions.js"

function init() {
  const scoreEl = document.querySelector("#score");
  const questionCounterEl = document.querySelector("#question-counter");
  const questionProgressEl = document.querySelector("#progress-bar");
  const questionTitleEl = document.querySelector("#question-title");

  const questionBoxEl = document.querySelector("#question-box");
  const answersListEl = document.querySelector("#answers-list");
  const feedbackEl = document.querySelector("#feedback");
  const nextBtnEl = document.querySelector("#next-btn");
  const resultBoxEl = document.querySelector("#result-box");
  const resultMessageEl = document.querySelector("#result-message");
  const restartBtnEl = document.querySelector("#restart-btn");

  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnswered = false;
}

init();