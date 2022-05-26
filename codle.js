let questionCount = 0;
let wrongAnswerCount = 0;
let rightAnswerCount = 0;
let tweetResults = [];
let totalPlays = 0;
let current_streak = 0;
let max_streak = 0;

// totalPlays = Number(localStorage.getItem("totalPlays"));
localStorage.clear();

const gameState = () => {
  if (localStorage !== undefined) {
    let questionCount = localStorage.getItem("questionCount");
    questionCount = Number(questionCount);
    let img = document.getElementById("q");
    if (questionCount > 0) {
      img.src = imgHandler()[questionCount];
    }
    // let answersContainer = localStorage.getItem("answersContainer");
    let answers = localStorage.getItem("answers");
  }
};

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
  let totalQuestions = 0;
  for (let i = 0; i < validIMGs.length; i++) {
    totalQuestions += 1;
  }
  return validIMGs;
};

const addNewAnswerField = () => {
  let oldAnswer = document.getElementById(`answer${questionCount}`);
  let originalAnswer = document.getElementById("myForm0");
  if (checkGameCount() && oldAnswer.value != "") {
    let newAnswer = document.createElement("input");
    let newForm = document.createElement("form");
    questionCount++;
    localStorage.setItem("questionCount", String(questionCount));
    newForm.id = `myForm${questionCount}`;
    newForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    newAnswer.type = "text";
    newAnswer.id = `answer${questionCount}`;
    newAnswer.autocomplete = "off";
    newAnswer.required = true;
    newAnswer.placeholder = "Answer here";
    let parent = document.getElementById("answers-container");
    let oldForm = document.getElementById(`myForm${questionCount - 1}`);

    newForm.appendChild(newAnswer);
    newForm.appendChild(oldForm);
    parent.append(newForm);
    newAnswer.focus();
    localStorage.setItem("answersContainer", parent.outerHTML);

    // something going wrong here with how I want to save the answers to storage
    // if (localStorage.getItem("answers") === null) {
    //   let answers = { answers: ["", "", "", "", ""] };
    //   localStorage.setItem("answers", JSON.stringify(answers));
    // } else {
    //   localStorage.getItem("answers")
    //   answers["answers"][questionCount - 1] = oldAnswer.value;
    //   localStorage.setItem("answers", JSON.stringify(answers));
    // }
  }
  originalAnswer.setAttribute("disabled", true);
  oldAnswer.setAttribute("disabled", true);
};

const makeFinalReadOnly = () => {
  let finalAnswer = document.getElementById(`answer${questionCount}`);
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
      answer.style.borderColor = "#C5D86D";
      tweetResults.push("🟩");
    } else {
      answer.style.color = "#D7263D";
      answer.classList.add("error");
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
    setTimeout(function () {
      addNewAnswerField();
      imgHandler();
    }, 200);
  } else {
    validateAnswer();
    makeFinalReadOnly();
    updateStats();
    showModal();
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

const changePage = () => {
  window.location.href =
    "http://127.0.0.1:5555/RiverHacksFinal-main/codle_endless.html";
};

const showModal = () => {
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
};

const updateStats = () => {
  totalPlays += 1;
  todaysScore = String(`${rightAnswerCount}/${questionCount + 1}`);
  let scores = {
    "0/5": 0,
    "1/5": 0,
    "2/5": 0,
    "3/5": 0,
    "4/5": 0,
    "5/5": 0,
  };

  if (todaysScore in scores) {
    scores[todaysScore] += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  localStorage.setItem("totalPlays", totalPlays.toString());
  countDown();
  let plays = document.getElementById("total_played");
  let currentStreak = document.getElementById("current_streak");
  let maxStreak = document.getElementById("max_streak");
  plays.innerHTML = totalPlays;
  currentStreak.innerHTML = 1;
  maxStreak.innerHTML = 1;
};

const countDown = () => {
  let endDate = new Date();
  endDate.setHours(24, 0, 0, 0);

  var countDownTimer = setInterval(() => {
    var now = new Date().getTime();
    let remainingTime = endDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    let daysLeft = Math.floor(remainingTime / day);
    let hoursLeft = Math.floor((remainingTime % day) / hour);
    let minutesLeft = Math.floor((remainingTime % hour) / minute);
    let secondsLeft = Math.floor((remainingTime % minute) / second);

    document.getElementById("countdown").innerHTML = `${pad(hoursLeft)}:${pad(
      minutesLeft
    )}:${pad(secondsLeft)}`;
  }, 1000);
};

function pad(n) {
  return n < 10 ? "0" + n : n;
}
