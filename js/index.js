const quizSelectElement = document.getElementById("quiz-select");
const quizRunElement = document.getElementById("quiz-run");
const quizResultElement = document.getElementById("quiz-result");

let currentQuiz = quizObject.quizArray[0]; // 0 = Djur Quiz, 1 = Data Quiz
let currentAnswers = [];

/* Baker */

/* Henrik *



/* Kaj */

/* Viktor */

// const quizTimer = document.getElementById("quizTimer");

// const startButton document.getElementById("idStartBtn");

// startButton.addEventListener("click", startTimer);

let timerCountSec = 0;

let timerInterval;

function startTimer() {
  // A Condition which prevents a new interval to be started if an interval is already ongoing
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  timerCountSec++;

  //Made a condition to make timer start at 00 instead of 0
  if (timerCountSec < 10) {
    quizTimer.innerHTML = "0" + timerCountSec;
  } else {
    quizTimer.innerHTML = timerCountSec;
  }

  if (timerCountSec === currentQuiz.timeLimitSec) {
    pauseTimer();
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  timerCountSec = 0;
  quizTimer.innerHTML = "0" + timerCountSec;
}
