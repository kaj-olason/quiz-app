import quizDataJson from "../quizdata.json" with { type: "json" };

let quizData = {};

if (localStorage.getItem("quizData")) {
  quizData = JSON.parse(localStorage.getItem("quizData"));
} else {
  // Store the quiz-object into local-storage
  localStorage.setItem("quizData", JSON.stringify(quizDataJson));
}

const quizSelectElement = document.getElementById("quiz-select");
const quizRunElement = document.getElementById("quiz-run");
const quizResultElement = document.getElementById("quiz-result");

console.log(quizData);

let quizObject = {
  quizArray: [
    {
      quizName: "Djur Quiz",
      questionsArray: [
        {
          question: "Hur många ben har en myra?",
          answers: ["4st", "6st", "8st", "10st"],
          correctIndexAnswer: 1,
        },
        {
          question: "En zebra är...",
          answers: ["rutig", "grön", "randig", "blå"],
          correctIndexAnswer: 2,
        },
      ],
    },
    {
      quizName: "Data Quiz",
      questionsArray: [
        {
          question: "Vilken av följande är ett programmeringsspråk?",
          answers: ["Hamburger", "Coffee", "Whiskey", "Java"],
          correctIndexAnswer: 3,
        },
        {
          question: "Vad står MB för?",
          answers: ["Mera Byte", "Många Byte", "Mega Byte", "Multi Byte"],
          correctIndexAnswer: 0,
        },
      ],
    },
  ],
};

let currentQuiz = quizObject.quizArray[0]; // 0 = Djur Quiz, 1 = Data Quiz
let currentAnswers = [];

/* Baker */

/* Henrik *



/* Kaj */

/* Viktor */
