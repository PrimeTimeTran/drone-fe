import M from "materialize-css";

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

export const toastCorrect = () => {
  M.toast({
    html: "Correct!",
    classes: "toast-valid",
    displayLength: 1500,
  });
};

export const toastIncorrect = () => {
  M.toast({
    html: "Wrong Answer",
    classes: "toast-invalid",
    displayLength: 1500,
  });
};
