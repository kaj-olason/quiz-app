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



/* Henrik */

loadQuizzes();

function loadQuizzes() {
    for(let i=0; i<quizObject.quizArray.length; i++) {
        const quiz = quizObject.quizArray[i];
        const quizName = quiz.quizName;
        const quizElement = document.createElement("p");
        quizElement.dataset.id = i;
        quizElement.classList.add("quiz-select-item");
        quizElement.addEventListener("click", (e) => selectQuiz(quizElement));
        quizElement.innerHTML = quiz.quizName;
        quizSelectElement.appendChild(quizElement);
    }
}

function selectQuiz(quiz) {
    currentQuiz = quizObject.quizArray[quiz.dataset.id];
    console.log("currentQuiz", currentQuiz, quiz.dataset.id);
    // loadQuiz();
}




/* Kaj */

/* Viktor */
