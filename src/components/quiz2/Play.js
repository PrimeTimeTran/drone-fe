import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";

import { withRouter } from "react-router-dom";
import Axios from "axios";

import isEmpty from "../../utils/is-empty";
import { correctSound, wrongSound, selectSound } from "../../assets/audio";

import AnswerOptions from "./containers/AnswerOptions";
import ControlOptions from "./components/ControlOptions";

import { defaultState } from "./utils";

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    try {
      const res = await Axios.get(
        process.env.REACT_APP_SERVER_URL + "/questions/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      this.setState({ questions: res.data }, this.startGame);
    } catch (e) {
      console.log("error while getting questions", e);
    }
  };

  startGame = () => {
    const {
      questions,
      nextQuestion,
      currentQuestion,
      previousQuestion,
    } = this.state;

    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );

    this.startTimer();
  };

  displayQuestions = (questions = this.state.questions) => {
    let { currentQuestionIndex } = this.state;
    let currentQuestion, nextQuestion, previousQuestion;
    if (!isEmpty(questions)) {
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion =
        questions[
          currentQuestionIndex === 0
            ? currentQuestionIndex
            : currentQuestionIndex - 1
        ];
      const answer = currentQuestion.answer;
      this.setState(
        {
          answer,
          nextQuestion,
          currentQuestion,
          previousQuestion,
          previousRandomNumbers: [],
          numberOfQuestions: questions.length,
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (option) => {
    console.log(option);
    const correctAnswer =
      option.toLowerCase() === this.state.answer.toLowerCase();
    if (correctAnswer) {
      setTimeout(() => {
        this.correctSound.current.play();
      }, 200);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        this.wrongSound.current.play();
      }, 200);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextionQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextionQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.setState(defaultState);
      this.props.history.push("/");
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });
    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 180000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }
    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        disableNextButton: true,
      });
    } else {
      this.setState({
        disableNextButton: false,
      });
    }
  };

  endGame = async () => {
    alert("Quiz has ended");
    const token = localStorage.getItem("usertoken");
    const { state } = this;
    const playerStats = {
      score: state.score,
      hintsUsed: 5 - state.hints,
      wrongAnswers: state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
    };
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/quizzes",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: {
          score: state.score,
        },
      }
    );
    const json = await response.json();
    setTimeout(() => {
      this.props.history.push("/play/summary", playerStats);
    }, 1000);
  };

  render() {
    const {
      time,
      hints,
      fiftyFifty,
      currentQuestion,
      numberOfQuestions,
      disableNextButton,
      currentQuestionIndex,
    } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>PART 107 - Commercial UAS Study Guide</title>
        </Helmet>
        <Fragment>
          <audio ref={this.correctSound} src={correctSound}></audio>
          <audio ref={this.wrongSound} src={wrongSound}></audio>
          <audio ref={this.buttonSound} src={selectSound}></audio>
        </Fragment>
        <div className="questions">
          <h2>Commercial UAS Study Guide</h2>
          <div className="lifeline-container">
            <p>
              <span
                onClick={this.handleFiftyFifty}
                className="mdi mdi-set-center mdi-24px lifeline-icon"
              >
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span
                onClick={this.handleHints}
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
              >
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}{" "}
              </span>
              <span className="right">
                {time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>

          <h5>{currentQuestion.question}</h5>
          <AnswerOptions
            currentQuestion={currentQuestion}
            handleOptionClick={this.handleOptionClick}
          />
          <ControlOptions
            handleNextButtonClick={this.handleNextButtonClick}
            disableNextButton={disableNextButton}
            handleQuitButtonClick={this.handleQuitButtonClick}
            handlePreviousButtonClick={this.handlePreviousButtonClick}
            previousButtonDisabled={this.state.handlePreviousButtonClick}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Play);
