import { questions } from "./questions.js"

function init() {
  const scoreEl = document.querySelector("#score");
  const questionCounterEl = document.querySelector("#question-counter");
  const questionProgressEl = document.querySelector("#progress-bar");
  const questionTitleEl = document.querySelector("#question-title");

  const progressBarEl = document.querySelector(".progress");

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

  function updateQuestionInfo() {
    questionCounterEl.textContent = `Pytanie ${currentQuestionIndex + 1} z ${questions.length}`
  }

  function createAnswerButton(answer) {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.type = "button";
    button.dataset.id = answer.id;
    button.textContent = answer.text;

    answersListEl.appendChild(button);
  }

  function handleAnswerClick(button) {
    const buttons = answersListEl.querySelectorAll(".answer-btn");

    buttons.forEach(button => button.disabled = true);

    const currentQuestion = getCurrentQuestion();
    const correctAnswerObj = currentQuestion.answers.find(question => question.correct === true);

    const clickedButtonId = button.dataset.id;
    const correctAnswerId = correctAnswerObj.id;

    if (clickedButtonId === correctAnswerId) handleCorrectAnswer(button);
    else handleInCorrectAnswer(button, correctAnswerId);

    nextBtnEl.disabled = false;
    hasAnswered = true;
  }

  function handleCorrectAnswer(button) {
    button.classList.add("correct");
    feedbackEl.classList.add("correct");
    feedbackEl.textContent = "Correct! You answered right!"

    score += 1;
    updateScore();
  }

  function handleInCorrectAnswer(button, correctAnswerId) {
    button.classList.add("incorrect");

    feedbackEl.classList.add("incorrect");
    feedbackEl.textContent = " Wrong! Maybe next time!"

    const correctButtonAnswer = answersListEl.querySelector(`[data-id="${correctAnswerId}"]`);
    correctButtonAnswer.classList.add("correct");
  }

  function resetFeedback() {
    feedbackEl.textContent = "";

    feedbackEl.classList.remove("correct");
    feedbackEl.classList.remove("incorrect");
  }

  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }

  function renderQuestion() {
    answersListEl.textContent = "";
    resetFeedback();
    updateQuestionInfo();
    updateProgressBar();


    const currentQuestion = getCurrentQuestion();

    questionTitleEl.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(createAnswerButton)

    nextBtnEl.disabled = true;
    hasAnswered = false;
  }

  function updateProgressBar() {
    const questionsLength = questions.length;
    questionProgressEl.style.width = `${(currentQuestionIndex + 1) * (100 / questionsLength)}%`
  }

  function updateScore() {
    scoreEl.textContent = score;
  }

  function handleResult() {
    updateScore()

    nextBtnEl.classList.add("hidden");
    questionBoxEl.classList.add("hidden");
    progressBarEl.classList.add("hidden");

    resultMessageEl.textContent = `Twój wynik: ${score}/${questions.length}`;
    resultBoxEl.classList.remove("hidden");
  }

  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;

    updateScore();

    nextBtnEl.classList.remove("hidden");
    questionBoxEl.classList.remove("hidden");
    progressBarEl.classList.remove("hidden");

    resultBoxEl.classList.add("hidden");

    renderQuestion();
  }

  function handleNextQuestion() {
    if (!hasAnswered) return;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      renderQuestion();
      return;
    }


    handleResult();
  }

  answersListEl.addEventListener("click", function handleClick(event) {
    if (hasAnswered) return;

    const button = event.target.closest(".answer-btn");
    if (!button) return;

    handleAnswerClick(button);
  })

  nextBtnEl.addEventListener("click", handleNextQuestion);
  restartBtnEl.addEventListener("click", resetGame)


  renderQuestion();
}

init();