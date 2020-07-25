import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { correctSound, wrongSound, selectSound } from "../../assets/audio";

import { HelpBar, AnswerOptions, ControlOptions, Toast } from "./containers";

import { defaultState, showToast } from "./utils";
import { postQuizScore, getQuestions } from "../../api";

export default class QuizPage extends React.Component {
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
    const { currentQuestionIdx, questions } = this.state;
    const currentQuestion = questions[currentQuestionIdx];
    const gameOver = questions[currentQuestionIdx + 1] === undefined;

    const { answer } = currentQuestion;

    this.setState(
      {
        gameOver,
        currentQuestion,
        previousRandomNumbers: [],
        numberOfQuestions: questions.length,
        answer: answer.toLowerCase(),
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
      showToast(true);
    } else {
      this.wrongSound.current.play();
      navigator.vibrate(1000);
      showToast(false);
    }
    this.updateScore(correct);
  };

  playButtonSound = () => this.buttonSound.current.play();

  updateScore = (correct) => {
    const incrementor = correct ? "correctCount" : "wrongCount";
    this.setState(
      (prevState) => ({
        [incrementor]: prevState[incrementor] + 1,
        currentQuestionIdx: prevState.currentQuestionIdx + 1,
        score: correct ? prevState.score + 1 : prevState.score,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.gameOver) {
          this.endGame();
        } else {
          this.displayQuestions();
        }
      }
    );
  };

  handleNav = (direction) => {
    this.playButtonSound();
    this.setState(({ currentQuestionIdx }) => {
      const idx = currentQuestionIdx + (direction === "forward" ? 1 : -1);
      return { currentQuestionIdx: idx };
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
    const fiveMinutes = 60 * 5;
    let timer = fiveMinutes,
      minutes,
      seconds;
    this.interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const newTime = minutes + ":" + seconds;
      this.setState({ time: newTime });
      if (--timer < 0) {
        this.endGame();
        clearInterval(this.interval);
      }
    }, 1000);
  };

  handleDisablingButtons = () => {
    const { currentQuestionIdx, numberOfQuestions } = this.state;
    this.setState({
      disablePreviousButton: currentQuestionIdx === 0,
      disableNextButton: currentQuestionIdx + 1 === numberOfQuestions,
    });
  };

  endGame = () => {
    const {
      score,
      hints,
      fiftyFifty,
      wrongCount,
      correctCount,
      numberOfQuestions,
      numberOfAnsweredQuestions,
    } = this.state;

    const playerStats = {
      score,
      wrongCount,
      correctCount,
      numberOfQuestions,
      hintsUsed: 5 - hints,
      numberOfAnsweredQuestions,
      fiftyFiftyUsed: 2 - fiftyFifty,
    };
    postQuizScore(playerStats);
    setTimeout(() => {
      this.props.history.push("/summary", playerStats);
    }, 1000);
  };

  render() {
    const {
      time,
      hints,
      gameOver,
      fiftyFifty,
      currentQuestion,
      numberOfQuestions,
      disableNextButton,
      currentQuestionIdx,
      disablePreviousButton,
    } = this.state;

    return (
      <Fragment>
        <audio ref={this.correctSound} src={correctSound}></audio>
        <audio ref={this.wrongSound} src={wrongSound}></audio>
        <audio ref={this.buttonSound} src={selectSound}></audio>
        <Container className="border">
          <Toast />
          <Row>
            <Col className="p-3">
              <HelpBar
                gameOver={gameOver}
                time={time}
                hints={hints}
                fiftyFifty={fiftyFifty}
                handleHints={this.handleHints}
                numberOfQuestions={numberOfQuestions}
                handleFiftyFifty={this.handleFiftyFifty}
                currentQuestionIdx={currentQuestionIdx}
              />
              <h1 className="m-5 p-5 text-center">
                {currentQuestion.question}
              </h1>
              <AnswerOptions
                currentQuestion={currentQuestion}
                handleSelectAnswer={this.handleSelectAnswer}
              />
              <ControlOptions
                handleNav={this.handleNav}
                handleQuit={this.handleQuit}
                disableNextButton={disableNextButton}
                disablePrevButton={disablePreviousButton}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
