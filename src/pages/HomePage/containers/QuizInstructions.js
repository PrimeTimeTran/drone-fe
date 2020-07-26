import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import fiftyfifty from "../../../assets/img/fiftyfifty.png";
import answer from "../../../assets/img/answer.png";
import options from "../../../assets/img/options.png";
import hints from "../../../assets/img/hints.png";

const QuizInstructions = () => (
  <Fragment>
    {/* <h1>Getting Started</h1>
      <ul className="browser-default" id="main-list">
        <li>The Quiz lasts for 60 minutes and ends when your time elapses.</li>
        <li>
          Every question contains 4 possible answers.
          <img src={options} alt="Quiz App Options Example"></img>
        </li>
        <li>
          Select the option that best answers the question by clicking
          <img src={answer} alt="Quiz App Answer Example"></img>
        </li>
        <li>
          Although you don't have such a feature on the real test, Each game
          comes 2 lifelines namely:
          <ul id="sublist">
            <li> (2) 50-50 chances</li>
            <li> 5 Hints </li>
          </ul>
        </li>
        <li>
          Selecting a 50-50 lifeline by clicking the icon
          <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
          will remove 2 wrong answers, leaving the correct answer and one wrong
          answer.
          <img src={fiftyfifty} alt="Quiz App Options Example" />
        </li>
        <li>
          Using a hint by clicking the icon{" "}
          <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
          will remove one wrong answer leaving two wrong answers and one correct
          answer. Use as many hints on a single question.
          <img src={hints} alt="Quiz App Options Example" />
        </li>
        <li>
          You may quit the game at any time. However You in order to receive a
          score, you must finish the game.
        </li>
        <li>
          The timer starts as soon as the game loads! Goodluck and Happy
          Studies!
        </li>
      </ul> */}

    <Jumbotron>
      <h1>Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <Link className="right" id="next-button" to="/quiz">
          <Button variant="primary">
            <FontAwesomeIcon icon={faPlay} /> Play
          </Button>
        </Link>
      </p>
    </Jumbotron>
  </Fragment>
);

export default QuizInstructions;
