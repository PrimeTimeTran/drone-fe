export const defaultState = {
  score: 0,
  time: {},
  hints: 5,
  answer: "",
  questions: [],
  fiftyFifty: 2,
  wrongCount: 0,
  gameOver: false,
  correctCount: 0,
  currentQuestion: {},
  numberOfQuestions: 0,
  currentQuestionIdx: 0,
  usedFiftyFifty: false,
  previousRandomNumbers: [],
  disableNextButton: false,
  disablePreviousButton: true,
  numberOfAnsweredQuestions: 0,
};

export const showToast = (correct) => {
  const x = document.getElementById("toast");
  const el = document.getElementById("toast-header");
  const toastBG = document.getElementsByClassName('toast-header')
  if (correct) {
    el.innerHTML = "Correct!";
    toastBG[0].classList.remove("bg-danger");
    toastBG[0].classList.add("bg-success");
  } else {
    el.innerHTML = "Incorrect";
    toastBG[0].classList.remove("bg-success");
    toastBG[0].classList.add("bg-danger");
  }
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}