debugger;

quizSelectElement = document.getElementById("quiz-select");
quizRunElement = document.getElementById("quiz-run");
quizResultElement = document.getElementById("quiz-result");

//let quizObject = await readJsonFile("./json/quiz.json");

let quizObject = {
    quizArray : [ 
        {
            quizName : "Djur Quiz",
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

