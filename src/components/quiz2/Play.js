import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import { withRouter } from "react-router-dom";

import { correctSound, wrongSound, selectSound } from "../../assets/audio";

import { HelpBar, AnswerOptions, ControlOptions } from "./containers";

import { defaultState, toastCorrect, toastWrong } from "./utils";
import { sendQuizScore, getQuestions } from "../../api";

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({ questions }, this.startGame);
  }

  startGame = () => {
    this.startTimer();
    this.displayQuestions();
  };

  displayQuestions = () => {
    const { currentQuestionIndex, questions } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const gameOver = questions[currentQuestionIndex + 1];

    this.setState(
      {
        gameOver,
        currentQuestion,
        previousRandomNumbers: [],
        numberOfQuestions: questions.length,
        answer: currentQuestion.answer.toLowerCase(),
      },
      () => {
        this.showOptions();
        this.handleDisablingButtons();
      }
    );
  };

  handleSelectAnswer = (choice) => {
    const correct = choice.toLowerCase() === this.state.answer;
    if (correct) {
      this.correctSound.current.play();
      toastCorrect();
    } else {
      this.wrongSound.current.play();
      navigator.vibrate(1000);
      toastWrong();
    }
    this.updateScore(correct);
  };

  playButtonSound = () => this.buttonSound.current.play();

  updateScore = (correct) => {
    const incrementor = correct ? "correctAnswers" : "wrongAnswers";
    this.setState(
      (prevState) => ({
        [incrementor]: prevState[incrementor] + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        score: correct ? prevState.score + 1 : prevState.score,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.gameOver === undefined) {
          this.endGame();
        } else {
          this.displayQuestions();
        }
      }
    );
  };

  handleNav = (direction) => {
    this.playButtonSound();
    this.setState(({ currentQuestionIndex }) => {
      const idx = currentQuestionIndex + (direction === "forward" ? 1 : -1);
      return { currentQuestionIndex: idx };
    }, this.displayQuestions);
  };

  handleQuit = () => {
    this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });
    this.setState({ usedFiftyFifty: false });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer) {
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
        if (option.innerHTML.toLowerCase() === this.state.answer) {
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
        usedFifty: true,
        fiftyFifty: prevState.fiftyFifty - 1,
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
          this.endGame
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

  handleDisablingButtons = () => {
    const { currentQuestionIndex, numberOfQuestions } = this.state;
    this.setState({
      disablePreviousButton: currentQuestionIndex === 0,
      disableNextButton: currentQuestionIndex + 1 === numberOfQuestions,
    });
  };

  endGame = async () => {
    const {
      score,
      hints,
      fiftyFifty,
      wrongAnswers,
      correctAnswers,
      numberOfQuestions,
      numberOfAnsweredQuestions,
    } = this.state;

    const playerStats = {
      score,
      wrongAnswers,
      correctAnswers,
      numberOfQuestions,
      hintsUsed: 5 - hints,
      numberOfAnsweredQuestions,
      fiftyFiftyUsed: 2 - fiftyFifty,
    };

    sendQuizScore(score);
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
      disablePreviousButton,
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
          <HelpBar
            time={time}
            hints={hints}
            fiftyFifty={fiftyFifty}
            handleHints={this.handleHints}
            numberOfQuestions={numberOfQuestions}
            handleFiftyFifty={this.handleFiftyFifty}
            currentQuestionIndex={currentQuestionIndex}
          />
          <h5>{currentQuestion.question}</h5>
          <AnswerOptions
            currentQuestion={currentQuestion}
            handleSelectAnswer={this.handleSelectAnswer}
          />
          <ControlOptions
            handleNav={this.handleNav}
            handleQuit={this.handleQuit}
            disableNextButton={disableNextButton}
            previousButtonDisabled={disablePreviousButton}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Play);
