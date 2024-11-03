let quizObject = {};

if (localStorage.getItem("quizObject")) {
  quizObject = JSON.parse(localStorage.getItem("quizObject"));
} else {
  // Fetsh data from json-file if data not exist in local storage
  const response = await fetch("../quizdata.json");
  quizObject = await response.json();

  // Store the quiz-object into local-storage
  localStorage.setItem("quizObject", JSON.stringify(quizObject));
}

const quizSelectElement = document.getElementById("quiz-select");
const quizRunElement = document.getElementById("quiz-run");
const quizResultElement = document.getElementById("quiz-result");

let currentQuiz = quizObject[0]; // 0 = Djur Quiz, 1 = Data Quiz
let currentAnswers = [];

/* Baker */

/* Henrik *



/* Kaj */

/* Viktor */
