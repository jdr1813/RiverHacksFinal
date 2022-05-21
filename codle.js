let questionCount = 0;
let wrongAnswerCount = 0;
let rightAnswerCount = 0;
let tweetResults = [];
let canSubmit = false;

const imgHandler = () => {
  validIMGs = [
    "counter.png",
    "fizz.png",
    "list.png",
    "tricky.png",
    "recurse.png",
  ];
  let img = document.getElementById("q");
  img.src = validIMGs[questionCount];
};

const addNewAnswerField = () => {
  let oldAnswer = document.getElementById(`answer${questionCount}`);
  if (checkGameCount() && oldAnswer.value != "") {
    let newAnswer = document.createElement("input");
    let newForm = document.createElement("form");
    questionCount++;
    newForm.id = `myForm${questionCount}`;
    newForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    newAnswer.type = "text";
    newAnswer.id = `answer${questionCount}`;
    newAnswer.required = true;
    newAnswer.placeholder = "Answer here";
    let parent = document.getElementById("answers-container");
    newForm.appendChild(newAnswer);
    parent.appendChild(newForm);
  }
  oldAnswer.setAttribute("readonly", true);
};

const makeFinalReadOnly = () => {
  let finalAnswer = document.getElementById(`answer${2}`);
  finalAnswer.setAttribute("readonly", true);
};

const checkGameCount = () => {
  if (questionCount < 4) {
    return true;
  }
  return false;
};

const validateAnswer = () => {
  let answer = document.getElementById(`answer${questionCount}`);
  if (answer.value != "") {
    correctAnswers = ["7", "fizzbuzz", "9", "20", "2"];
    answerText = answer.value.toLowerCase();
    if (answerText == correctAnswers[questionCount]) {
      answer.style.color = "#C5D86D";
      rightAnswerCount++;
      tweetResults.push("🟩");
    } else {
      answer.style.color = "#D7263D";
      wrongAnswerCount++;
      tweetResults.push("🟥");
    }
  }
};

const checkForEmpty = () => {
  if (document.getElementById(`answer${questionCount}`).value == "") {
    alert("Enter a value");
  } else {
    return;
  }
};

document.addEventListener("submit", (e) => {
  if (!gameOver()) {
    e.preventDefault();
    validateAnswer();
    addNewAnswerField();
    imgHandler();
  } else {
    validateAnswer();
    makeFinalReadOnly();
    const modal = document.getElementById("modal_container");
    const close = document.getElementById("close");
    const score = document.getElementById("score");
    score.innerHTML = `You got ${rightAnswerCount} / ${
      questionCount + 1
    } answers right`;
    modal.classList.add("show");
    close.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }
});

function gameOver() {
  return questionCount == 4;
}

function updateTwitterLink() {
  let today = new Date().toLocaleDateString("en-US");
  document.getElementById(
    "twitter-share"
  ).href = `https://twitter.com/intent/tweet?text=${today}%0A${rightAnswerCount} / ${
    questionCount + 1
  } on today's Codle%0A${tweetResults[0]}%0A${tweetResults[1]}%0A${
    tweetResults[2]
  }%0A${tweetResults[3]}%0A${tweetResults[4]}`;
}
