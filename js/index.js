let quizObject = {};

if (localStorage.getItem("quizObject")) {
  quizObject = JSON.parse(localStorage.getItem("quizObject"));
} else {
  // Fetch data from json-file if data not exist in local storage
  const response = await fetch("../quizdata.json");
  quizObject = await response.json();

  // Store the quiz-object into local-storage
  localStorage.setItem("quizObject", JSON.stringify(quizObject));
}

const quizSelectElement = document.getElementById("quiz-select-id");
const quizRunElement = document.getElementById("quiz-run");
const quizResultElement = document.getElementById("quiz-result");

let currentQuiz = {};
let currentAnswers = [];

/* Baker */

/* Henrik */

/* Hamburger Menu */

const hamburgerMenuElement = document.getElementById("hamburger-menu-id");

hamburgerMenuElement.addEventListener("click", (e) => {
  const navMenuElement = document.getElementById("nav-menu-id");
  navMenuElement.classList.toggle("nav-menu-collapsed");
});

/* About Menu */

const aboutMenuElement = document.getElementById("nav-menu-about-id");

aboutMenuElement.addEventListener("click", (e) => {
  alert("Quiz 1.0\n\nBy Baker, Henrik, Kaj & Viktor");
});

/* Load function */
let selectQuizActive = true;
const quizListElement = document.getElementById("quiz-list-id");
const quizSliderElement = document.getElementById("quiz-slider-id");
quizListElement.classList.add("collapsed");
quizSliderElement.classList.add("collapsed");

loadQuizzes(quizListElement, "quiz-list-item");
loadQuizzes(quizSliderElement, "quiz-slider-item");
mediaQueryEventHandler();

function loadQuizzes(elementObj, classNames) {
  for (let key in quizObject) {
    const quiz = quizObject[key];
    const quizElement = document.createElement("p");
    quizElement.dataset.id = parseInt(key);
    quizElement.classList.add(classNames);
    quizElement.addEventListener("click", (e) => selectQuiz(quizElement));
    quizElement.innerText = quiz.quizName;
    elementObj.appendChild(quizElement);
  }
}

function selectQuiz(quiz) {
  currentQuiz = quizObject[quiz.dataset.id];
  quizSelectElement.classList.add("collapsed");
  quizRunElement.classList.remove("collapsed");

  console.log(`Quiz ${quiz.dataset.id} selected`);
  selectQuizActive = false;
  // loadQuiz(currentQuiz);
}

/* Media query handler */

const mediaQueryList = window.matchMedia("(min-width: 1024px)");

mediaQueryList.addEventListener("change", (event) => mediaQueryEventHandler());

function mediaQueryEventHandler() {
  const width = parseInt(
    window
      .getComputedStyle(document.querySelector("body"))
      .getPropertyValue("width")
  );

  if(selectQuizActive) {
    if (width >= 1024) {
      quizListElement.classList.add("collapsed");
      quizSliderElement.classList.remove("collapsed");
    } else {
      quizListElement.classList.remove("collapsed");
      quizSliderElement.classList.add("collapsed");
    }
  }
}

/* Scroll event handler */

quizSliderElement.addEventListener("scroll", (e) => scrollEventHandler(e));

function scrollEventHandler(e) {
  const quizSliderItemsElement = Array.from(
    document.getElementsByClassName("quiz-slider-item")
  );
  const quizSliderItemsElementWidth = parseInt(
    window.getComputedStyle(quizSliderItemsElement[0]).getPropertyValue("width")
  );
  const scrollPos = quizSliderElement.scrollLeft / quizSliderItemsElementWidth;
  scaleSliderItems(quizSliderItemsElement, scrollPos);
}

function scaleSliderItems(quizSliderItemsElement, scrollPos) {
  scrollPos = Math.max(
    0,
    Math.min(scrollPos, quizSliderItemsElement.length - 1)
  );
  const indexInFocus = Math.round(scrollPos);
  const indexLeft = Math.floor(scrollPos);
  const indexRight = Math.ceil(scrollPos);
  const indexLeftDiff = scrollPos - indexLeft;
  const indexRightDiff = indexRight - scrollPos;
  const leftFontSize = 1 + 5 * (1 - indexLeftDiff);
  const rightFontSize = 1 + 5 * (1 - indexRightDiff);

  for (let i = 0; i <= quizSliderItemsElement.length - 1; i++) {
    quizSliderItemsElement[i].style.fontSize = `1rem`;
    quizSliderItemsElement[i].style.color = "#000000";
    quizSliderItemsElement[i].style.zIndex = "0";
    quizSliderItemsElement[i].style.cursor = "default";
  }

  quizSliderItemsElement[indexLeft].style.fontSize = `${leftFontSize}rem`;
  quizSliderItemsElement[indexRight].style.fontSize = `${rightFontSize}rem`;

  quizSliderItemsElement[indexInFocus].style.cursor = "pointer";
  quizSliderItemsElement[indexInFocus].style.color = "#54C4F8";
  quizSliderItemsElement[indexInFocus].style.zIndex = "1";
}

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

