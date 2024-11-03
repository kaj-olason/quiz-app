let quizObject = {};

if (localStorage.getItem("quizObject")) {
  quizObject = JSON.parse(localStorage.getItem("quizObject"));
} else {
  // Fetsh data from json-file if data not exist in local storage
  const response = await fetch("./quizdata.json");
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

const quizListElement = document.getElementById("quiz-list-id");
const quizSliderElement = document.getElementById("quiz-slider-id");
quizListElement.classList.add("collapsed");
quizSliderElement.classList.add("collapsed");

/* Load function */

loadQuizzes(quizListElement, "quiz-list-item");
loadQuizzes(quizSliderElement, "quiz-slider-item");
mediaQueryEventHandler();

function loadQuizzes(elementObj, classNames) {
  let i=0;
  quizObject.forEach((quiz) => {
    const quizElement = document.createElement("p");
    quizElement.dataset.id = i++;
    quizElement.classList.add(classNames);
    quizElement.addEventListener("click", (e) => selectQuiz(quizElement));
    quizElement.innerHTML = quiz.quizName;
    elementObj.appendChild(quizElement);
  });
}

function selectQuiz(quiz) {
  currentQuiz = quizObject[quiz.dataset.id];
  quizSelectElement.classList.add("collapsed");
  quizRunElement.classList.remove("collapsed");

  console.log(`Quiz ${quiz.dataset.id} selected`);
  // loadQuiz();
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

  if (width >= 1024) {
    quizListElement.classList.add("collapsed");
    quizSliderElement.classList.remove("collapsed");
  } else {
    quizListElement.classList.remove("collapsed");
    quizSliderElement.classList.add("collapsed");
  }
}

/* Scroll event handler */

quizSliderElement.addEventListener("scroll", (e) => scrollEventHandler(e));

function scrollEventHandler(e) {
  console.log("scroll event");
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
  console.log("scrollPos", scrollPos);
  const indexInFocus = Math.round(scrollPos);
  const indexLeft = Math.floor(scrollPos);
  const indexRight = Math.ceil(scrollPos);
  const indexLeftDiff = scrollPos - indexLeft;
  const indexRightDiff = indexRight - scrollPos;
  const leftFontSize = 1 + 8 * (1 - indexLeftDiff);
  const rightFontSize = 1 + 8 * (1 - indexRightDiff);

  for (let i = 0; i <= quizSliderItemsElement.length - 1; i++) {
    quizSliderItemsElement[i].style.fontSize = `1rem`;
    quizSliderItemsElement[i].style.color = "#000000";
    quizSliderItemsElement[i].style.zIndex = "0";
    quizSliderItemsElement[i].style.cursor = "default";
    quizSliderItemsElement[i].removeEventListener("click", (e) =>
      SliderQuiz(e.target)
    );
  }

  quizSliderItemsElement[indexLeft].style.fontSize = `${leftFontSize}rem`;
  quizSliderItemsElement[indexRight].style.fontSize = `${rightFontSize}rem`;

  quizSliderItemsElement[indexInFocus].style.cursor = "pointer";
  quizSliderItemsElement[indexInFocus].style.color = "#54C4F8";
  quizSliderItemsElement[indexInFocus].style.zIndex = "1";
  quizSliderItemsElement[indexInFocus].addEventListener("click", (e) =>
    selectQuiz(e.target)
  );
}

/* Kaj */

/* Viktor */
