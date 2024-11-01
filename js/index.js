debugger;

const quizSelectElement = document.getElementById("quiz-select");
const quizRunElement = document.getElementById("quiz-run");
const quizResultElement = document.getElementById("quiz-result");

//let quizObject = await readJsonFile("./json/quiz.json");

let quizObject = {
    quizArray : [ 
        {
            quizName : "Djur Quiz",
            timeLimitSec : 30,
            questionsArray : [
                {
                    question : "Hur många ben har en myra?",
                    answers : ["4st", "6st", "8st", "10st"],
                    correctIndexAnswer : 1
                },
                {
                    question : "En zebra är...",
                    answers : ["rutig", "grön", "randig", "blå"],
                    correctIndexAnswer : 2
                }
            ]
        },
        {
            quizName : "Data Quiz",
            timeLimitSec : 30,
            questionsArray : [
                {
                    question : "Vilken av följande är ett programmeringsspråk?",
                    answers : ["Hamburger", "Coffee", "Whiskey", "Java"],
                    correctIndexAnswer : 3
                },
                {
                    question : "Vad står MB för?",
                    answers : ["Mera Byte", "Många Byte", "Mega Byte", "Multi Byte"],
                    correctIndexAnswer : 0
                }
            ]
        }
    ]
};

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

    timerCountSec += 1;
    
    if (timerCountSec < 10) {
        quizTimer.innerHTML = "0" + timerCountSec;
    } else {
        quizTimer.innerHTML = timerCountSec;
    }      
    
    if (timerCountSec === currentQuiz.timeLimitSec) {
        pauseTimer()
    }
}

function pauseTimer() {
    
    clearInterval(timerInterval);
    timerInterval = null; 
}

function resetTimer() {
    
    timerCountSec = 0;
    quizTimer.innerHTML = "0" + timerCountSec;
}

