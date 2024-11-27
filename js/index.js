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
        dotImg.alt = "Animal icon";
      } else if (quiz.quizName === "Data Quiz") {
        dotImg.src = "img/dot-img-computer.svg";
        dotImg.alt = "Computer icon";
      } else if (quiz.quizName === "Geografi Quiz") {
        dotImg.src = "img/dot-img-geography.svg";
        dotImg.alt = "Geography icon"
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
  welcomeMsg.classList.add("collapsed");

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
    const scrollPos =
      quizSliderElement.scrollLeft / quizSliderItemsElementWidth;
    scaleSliderItems(quizSliderItemsElement, scrollPos);
  } else {
    if (indexPos == 0) {
      quizSliderElement.scrollLeft = 0;
    } else if (indexPos === 1) {
      quizSliderElement.scrollLeft = quizSliderItemsElementWidth * 1.5;
    } else {
      quizSliderElement.scrollLeft = quizSliderItemsElementWidth * 2;
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
  });
}

/* Kaj */

function loadQuiz(quizObject) {
  //Check the width for responsive programatly
  var w = window.innerWidth;

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

  const hideError = () => {
    error.classList.remove("errorShow");
  };

  //Buttons
  let btnNext = document.getElementById("btnNext");

  let answareBtn = document.createElement("BUTTON");
  let answareBtnText = document.createTextNode("Se resultat");
  let buttonContainer = document.getElementById("btnContainer");
  answareBtn.appendChild(answareBtnText);
  answareBtn.classList.add("answareBtn");
  buttonContainer.appendChild(answareBtn);

  let currentIndex = 0;
  let currentBtnIndex = 0;
  let quizResult = 0;

  let maxIndex = quizObject.questionsArray.length;
  let maxPoint = quizObject.questionsArray.length;

  let quizResultObject = {
    playerName: "",
    quizTheme: quizObject.quizName,
    quizResult: [],
    maxPoint: maxPoint,
    yourPoint: 0,
  };

  // Timer
  const timer = document.createElement("p");
  timer.id = "quizTimer";
  timer.classList.add("quiz-timer");
  form.appendChild(timer);

  const quizTimer = document.getElementById("quizTimer");

  const startButton = document.getElementById("idStartBtn");

  let timerCountSec = 11;

  let timerInterval;

  function startTimer() {
    // A Condition which prevents a new interval to be started if an interval is already ongoing
    if (!timerInterval) {
      timerInterval = setInterval(updateTimer, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerCountSec = 11;
  }

  let firstTime = true;

  startTimer();

  const currentQuestion = document.createElement("p");
  currentQuestion.classList.add("current-question");

  form.appendChild(currentQuestion);

  function updateTimer() {
    // Current question
    currentQuestion.innerHTML = `Fråga ${currentIndex + 1} av ${maxIndex}`;
    timerCountSec--;

    if (timerCountSec < 10) {
      quizTimer.innerHTML = `Du har 0${timerCountSec} sekunder kvar att svara! `;
    } else {
      quizTimer.innerHTML = `Du har ${timerCountSec} sekunder kvar att svara! `;
    }

    if (timerCountSec < 5) {
      quizTimer.innerHTML = `MEN va långsam du är! <br> Nu är det bara ${timerCountSec} sekunder kvar! `;
    }

    if (timerCountSec <= 0 || firstTime == true) {
      let checkRadio = document.querySelector(
        `input[name="${currentIndex}"]:checked`
      );

      if (firstTime == false) {
        currentIndex = ++currentIndex;
        if (currentIndex <= maxIndex) {
          if ((w = 400)) {
            questionContainer.style.left = "-" + currentIndex * 400 + "px";
          } else {
            questionContainer.style.left = "-" + currentIndex * 800 + "px";
          }
        }
      }

      firstTime = false;

      if (currentIndex < maxIndex) {
        resetTimer();
        startTimer();
      } else {
        resetTimer();
        pauseTimer();
      }

      if (!(currentIndex + 1 < maxIndex)) {
        let obj = {
          quistion: "",
          correctAnsware: "",
          yourAnsware: "",
        };

        // obj.quistion = quizObject.questionsArray[currentIndex].question;

        // let correctAnswareIndex =
        //  quizObject.questionsArray[currentIndex].correctIndexAnswer;

        // let inputs = document.querySelectorAll("input[type='radio']");
        // inputs.forEach(function (h) {
        //   if (h.name == currentIndex && h.id == correctAnswareIndex) {
        //    obj.correctAnsware = h.value;
        //  }
        //  });

        if (checkRadio !== null) {
          error.classList.remove("errorShow");

          let checked = document.querySelectorAll(
            "input[type='radio']:checked"
          );
          checked.forEach(function (cb) {
            obj.yourAnsware = cb.value;

            if (cb.id == correctAnswareIndex) {
              ++quizResult;
            }
          });
        } else {
        }

        quizResultObject.quizResult.push(obj);

        btnNext.style.display = "none";
        answareBtn.style.display = "inline-block";

        if (currentIndex >= maxIndex) {
          showResult(quizResultObject);
          resetTimer();
          pauseTimer();
        }

        answareBtn.addEventListener("click", (e) => {
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
                console.log("jaja");
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
            console.log(quizResultObject);
            currentIndex = ++currentIndex;
            questionContainer.style.left = "-" + currentIndex * 800 + "px";
          } else {
            error.classList.add("errorShow");
          }
        });

        if (timerCountSec <= 1 && currentIndex == maxIndex + 1) {
          showResult(quizResultObject);
        }
      } else {
        let obj = {
          quistion: "",
          correctAnsware: "",
          yourAnsware: "",
        };

        obj.quistion = quizObject.questionsArray[currentIndex].question;

        let correctAnswareIndex =
          quizObject.questionsArray[currentIndex].correctIndexAnswer;

        let inputs = document.querySelectorAll("input[type='radio']");
        inputs.forEach(function (h) {
          if (h.name == currentIndex && h.id == correctAnswareIndex) {
            obj.correctAnsware = h.value;
          }
        });

        if (checkRadio !== null) {
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
        }

        quizResultObject.quizResult.push(obj);

        btnNext.style.display = "inline-block";
        answareBtn.style.display = "none";
      }

      btnNext.addEventListener("click", function (e) {
        e.preventDefault();

        if (currentBtnIndex < maxIndex) {
          resetTimer();
          startTimer();
        } else {
          resetTimer();
          pauseTimer();
        }

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
            quizObject.questionsArray[currentBtnIndex].correctIndexAnswer;

          obj.quistion = quizObject.questionsArray[currentBtnIndex].question;

          error.classList.remove("errorShow");

          let inputs = document.querySelectorAll("input[type='radio']");
          inputs.forEach(function (h) {
            if (h.name == currentBtnIndex && h.id == correctAnswareIndex) {
              obj.correctAnsware = h.value;
            }
          });

          let checked = document.querySelectorAll(
            "input[type='radio']:checked"
          );
          if (currentBtnIndex + 1 < maxIndex) {
            checked.forEach(function (cb) {
              obj.yourAnsware = cb.value;

              if (cb.id == correctAnswareIndex) {
                ++quizResult;
              }
            });
          }
          quizResultObject.quizResult.push(obj);

          if (currentBtnIndex <= maxIndex) {
            currentBtnIndex = ++currentIndex;
            if (w > 450) {
              questionContainer.style.left = "-" + currentIndex * 800 + "px";
            } else {
              questionContainer.style.left = "-" + currentIndex * 400 + "px";
            }
          }
        } else {
          error.classList.add("errorShow");
        }

        if (currentBtnIndex + 1 >= maxIndex) {
          btnNext.style.display = "none";
          answareBtn.style.display = "inline-block";
          answareBtn.addEventListener("click", (e) => {
            e.preventDefault();

            let obj = {
              quistion: "",
              correctAnsware: "",
              yourAnsware: "",
            };

            let checkRadio = document.querySelector(
              `input[name="${currentBtnIndex}"]:checked`
            );
            if (checkRadio !== null) {
              let correctAnswareIndex =
                quizObject.questionsArray[currentBtnIndex].correctIndexAnswer;

              obj.quistion =
                quizObject.questionsArray[currentBtnIndex].question;

              error.classList.remove("errorShow");

              let inputs = document.querySelectorAll("input[type='radio']");
              inputs.forEach(function (h) {
                if (h.name == currentBtnIndex && h.id == correctAnswareIndex) {
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

              quizResult = quizResult - 1;
              quizResultObject.quizResult.push(obj);
              quizResultObject.yourPoint = quizResult;

              showResult(quizResultObject);
            } else {
              error.classList.add("errorShow");
            }
          });
        } else {
          btnNext.style.display = "inline-block";
          answareBtn.style.display = "none";
        }

        if (timerCountSec <= 1 && currentIndex == maxIndex) {
          showResult(quizResultObject);
        }
      });
      if (timerCountSec <= 0 && currentIndex == maxIndex) {
        showResult(quizResultObject);
      }
    }

    if (timerCountSec <= 0 && currentIndex == maxIndex) {
      showResult(quizResultObject);
    }
  }

  currentQuiz.questionsArray.forEach((quizItem, questionIndex) => {
    //Fieldset
    const fieldset = document.createElement("fieldset");
    fieldset.classList.add("quizFieldset");
    questionContainer.appendChild(fieldset);

    //The Quiestion text
    const questionText = document.createElement("p");
    const questionNode = document.createTextNode(quizItem.question);
    questionText.classList.add("quiz-questions");
    questionText.appendChild(questionNode);
    fieldset.appendChild(questionText);

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
      input.addEventListener("click", () => {
        hideError();
      });
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

  if (timerCountSec <= 1 && currentIndex == maxIndex) {
    showResult(quizResultObject);
  }
}

/* Baker */ const showResult = (resultObject) => {
  document.getElementById("quiz-run").classList.toggle("collapsed");
  document.getElementById("quiz-result").classList.toggle("collapsed");
  document.getElementById(
    "result"
  ).innerText = `${resultObject.yourPoint} / ${resultObject.maxPoint}`;
};

const anotherQuiz = document.getElementById("anotherQuiz");

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

      welcomeMsg.innerText = `Welcome, ${playerName}! Select a quiz and start playing!`;
    }
  });

  anonymousBtn.addEventListener("click", () => {
    popupContainer.classList.toggle("collapsed");

    welcomeMsg.innerText = `Welcome! Select a quiz and start playing!`;
  });
} else {
  const playerName = localStorage.getItem("playerName");
  welcomeMsg.innerText = `Welcome back, ${playerName}! You know the drill, get ready!`;
}
