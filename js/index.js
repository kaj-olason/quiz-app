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
const sliderPaginationElement = document.getElementById("slider-pagination-id");
quizListElement.classList.add("collapsed");
quizSliderElement.classList.add("collapsed");
sliderPaginationElement.classList.add("collapsed");

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

    if (elementObj === quizSliderElement) {
      const paginationDot = document.createElement("div");
      paginationDot.id = key;
      paginationDot.classList.add("pagination-dot");
      paginationDot.addEventListener("click", () => {
        scrollEventHandler(paginationDot.id);
      });
      const dotImg = document.createElement("img");
      dotImg.classList.add("dot-img");
      console.log(quizObject[key].quizName);

      if (quiz.quizName === "Djur Quiz") {
        dotImg.src = "img/dot-img-animal.svg";
      } else if (quiz.quizName ==="Data Quiz") {
        dotImg.src = "img/dot-img-computer.svg";
      } else if (quiz.quizName === "Geografi Quiz") {
        dotImg.src = "img/dot-img-geography.svg";
      }

      paginationDot.appendChild(dotImg);
      sliderPaginationElement.appendChild(paginationDot);
    }
  }
}

function selectQuiz(quiz) {
  currentQuiz = quizObject[quiz.dataset.id];
  quizSelectElement.classList.add("collapsed");
  quizRunElement.classList.remove("collapsed");
  welcomeMsg.classList.add("collapsed")

 // console.log(`Quiz ${quiz.dataset.id} selected`);
  selectQuizActive = false;
  // loadQuiz(currentQuiz);
  loadQuiz(currentQuiz);
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

  if (selectQuizActive) {
    if (width >= 1024) {
      quizListElement.classList.add("collapsed");
      quizSliderElement.classList.remove("collapsed");
      sliderPaginationElement.classList.remove("collapsed");
    } else {
      quizListElement.classList.remove("collapsed");
      quizSliderElement.classList.add("collapsed");
      sliderPaginationElement.classList.add("collapsed");
    }
  }
}

/* Scroll event handler */

quizSliderElement.addEventListener("scroll", () => scrollEventHandler());

function scrollEventHandler(indexPos) {
  indexPos = parseInt(indexPos);
  const quizSliderItemsElement = Array.from(
    document.getElementsByClassName("quiz-slider-item")
  );
  const quizSliderItemsElementWidth = parseInt(
    window.getComputedStyle(quizSliderItemsElement[0]).getPropertyValue("width")
  );
  
  if (!indexPos && indexPos !== 0) {
    const scrollPos = quizSliderElement.scrollLeft / quizSliderItemsElementWidth;
    scaleSliderItems(quizSliderItemsElement, scrollPos);
  
  } else {
      if (indexPos == 0) {
        quizSliderElement.scrollLeft = 0;  

      } else if (indexPos === 1) {
        quizSliderElement.scrollLeft = quizSliderItemsElementWidth*1.5;
  
      } else {
        quizSliderElement.scrollLeft = quizSliderItemsElementWidth*2;
      }
  }
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
  
  const paginationDots = document.querySelectorAll(".pagination-dot"); 
  paginationDots.forEach((dot, index) => {
    if (index === indexInFocus) {
      dot.classList.add("active-dot");
    } else {
      dot.classList.remove("active-dot");
    }
  })
}

/* Kaj */
function loadQuiz(quizObject) {
  // Form
  let form = document.getElementById("quiz-form");
  form.classList.add("quiz-form");

  // Title
  const title = document.createElement("p");
  title.innerHTML = `Du har valt quiz med temat <span class="quiz-title-theme">${quizObject.quizName}</span>`;
  title.classList.add("quiz-title");
  form.appendChild(title);

  // Question Container
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("questionContainer");
  form.appendChild(questionContainer);

  //Error
  let error = document.createElement("p");
  let errorMessage = document.createTextNode("Du behöver göra ett val!");
  error.appendChild(errorMessage);
  error.classList.add("error");
  form.appendChild(error);

  //Buttons
  let btnNext = document.getElementById("btnNext");

  let answareBtn = document.createElement("BUTTON");
  let answareBtnText = document.createTextNode("Se resultat");
  let buttonContainer = document.getElementById("btnContainer");
  answareBtn.appendChild(answareBtnText);
  answareBtn.classList.add("answareBtn");
  buttonContainer.appendChild(answareBtn);

  let currentIndex = 0;
  let quizResult = 0;

  let maxIndex = quizObject.questionsArray.length - 1;
  let maxPoint = quizObject.questionsArray.length;

  let quizResultObject = {
    playerName: "",
    quizTheme: quizObject.quizName,
    quizResult: [],
    maxPoint: maxPoint,
    yourPoint: 0,
  };

  btnNext.addEventListener("click", function (e) {
    e.preventDefault();

    let obj = {
      quistion: "",
      correctAnsware: "",
      yourAnsware: "",
    };

    let checkRadio = document.querySelector(
      `input[name="${currentIndex}"]:checked`
    );

    if (checkRadio !== null) {
      let correctAnswareIndex =
        quizObject.questionsArray[currentIndex].correctIndexAnswer;

      obj.quistion = quizObject.questionsArray[currentIndex].question;

      error.classList.remove("errorShow");

      let inputs = document.querySelectorAll("input[type='radio']");
      inputs.forEach(function (h) {
        if (h.name == currentIndex && h.id == correctAnswareIndex) {
          obj.correctAnsware = h.value;
        }
      });

      let checked = document.querySelectorAll("input[type='radio']:checked");
      checked.forEach(function (cb) {
        obj.yourAnsware = cb.value;

        if (cb.id == correctAnswareIndex) {
          ++quizResult;
        }
      });
      quizResultObject.quizResult.push(obj);
      // console.log(quizResultObject);
      currentIndex = ++currentIndex;
      questionContainer.style.left = "-" + currentIndex * 800 + "px";
    } else {
      error.classList.add("errorShow");
    }

    if (currentIndex >= maxIndex) {
      btnNext.style.display = "none";
      answareBtn.style.display = "inline-block";
      answareBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let obj = {
          quistion: "",
          correctAnsware: "",
          yourAnsware: "",
        };

        // console.log("Your result: ", quizResult);
        // console.log("Current index: ", currentIndex);

        let checkRadio = document.querySelector(
          `input[name="${currentIndex}"]:checked`
        );
        if (checkRadio !== null) {
          let correctAnswareIndex =
            quizObject.questionsArray[currentIndex].correctIndexAnswer;

          // console.log(quizObject);
          // console.log(currentIndex);
          // console.log(obj);
          obj.quistion = quizObject.questionsArray[currentIndex].question;

          error.classList.remove("errorShow");

          let inputs = document.querySelectorAll("input[type='radio']");
          inputs.forEach(function (h) {
            if (h.name == currentIndex && h.id == correctAnswareIndex) {
              obj.correctAnsware = h.value;
            }
          });

          let checked = document.querySelectorAll(
            "input[type='radio']:checked"
          );
          checked.forEach(function (cb) {
            obj.yourAnsware = cb.value;

            if (cb.id == correctAnswareIndex) {
              ++quizResult;
            }
          });
          quizResultObject.quizResult.push(obj);
          quizResultObject.yourPoint = quizResult;
          // console.log(quizResultObject);
          showResult(quizResultObject);
        } else {
          error.classList.add("errorShow");
        }
      });
    } else {
      btnNext.style.display = "inline-block";
      answareBtn.style.display = "none";
    }
  });

  currentQuiz.questionsArray.forEach((quizItem, questionIndex) => {
    //Fieldset
    const fieldset = document.createElement("fieldset");
    fieldset.classList.add("quizFieldset");
    questionContainer.appendChild(fieldset);

    //The Quiestion text
    const questionNode = document.createElement("p");
    const questionText = document.createTextNode(quizItem.question);
    questionNode.appendChild(questionText);
    fieldset.appendChild(questionNode);

    //Inputs
    const inputs = document.createElement("div");
    inputs.classList.add("inputs");
    fieldset.appendChild(inputs);

    quizItem.answers.forEach((quizAnsware, answareIndex) => {
      //Input Container
      const inputContainer = document.createElement("div");
      inputContainer.classList.add("inputContainer");
      inputs.appendChild(inputContainer);

      //Input
      const input = document.createElement("INPUT");
      input.type = "radio";
      input.id = answareIndex;
      input.name = questionIndex;
      input.value = quizAnsware;
      inputContainer.appendChild(input);

      //Label
      const label = document.createElement("Label");
      label.htmlFor = questionIndex;
      label.innerHTML = quizAnsware;
      label.classList.add("label");
      inputContainer.appendChild(label);
    });
  });
}

/* Baker */;

const showResult = (resultObject) => {
  document.getElementById("quiz-run").classList.toggle("collapsed");
  document.getElementById("quiz-result").classList.toggle("collapsed");
  document.getElementById("result").innerText = `${resultObject.yourPoint} / ${resultObject.maxPoint}`;
};

const tryAgain = document.getElementById("tryAgain");
const anotherQuiz =document.getElementById("anotherQuiz");

tryAgain.addEventListener("click", (quiz) => {

console.log("får ej till att knappen startar samma quiz");

});

anotherQuiz.addEventListener("click", () => {

  location.reload();
});

  
/* Viktor */

const popupContainer = document.getElementById("popup-container-id");
const inputName = document.getElementById("input-name-id");
const submitBtn = document.getElementById("submit-btn-id");
const anonymousBtn = document.getElementById("anonymous-btn-id");

const welcomeMsg = document.getElementById("welcome-msg-id");
const mainElement = document.querySelector("main");

if (!localStorage.getItem("playerName")) {
  
  popupContainer.classList.toggle("collapsed");

  submitBtn.addEventListener("click", () => {
      
      if (inputName.value === "") {

        alert("Please enter a name");
      
      } else {

          localStorage.setItem("playerName", inputName.value);
          popupContainer.classList.toggle("collapsed");
          const playerName = localStorage.getItem("playerName");

          welcomeMsg.innerText = `Welcome, ${playerName}! Select a quiz and start playing!` 

        }
    });

    anonymousBtn.addEventListener("click", () => {

      popupContainer.classList.toggle("collapsed");

      welcomeMsg.innerText = `Welcome! Select a quiz and start playing!`
    
    })

} else {
    const playerName = localStorage.getItem("playerName");
    welcomeMsg.innerText = `Welcome, ${playerName}! Back for more quiz-action?`
}


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
