import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const QuizInstructions = (props) => (
  <Fragment>
    <Jumbotron>
      <h1>Welcome {props.name}</h1>
      <p>
        Getting Started Each test lasts for 12 minutes and ends when your time
        elapses. Every question contains 3 possible answers. Although you don't
        have such a feature on the real Part 107 test. 
        <br />
        The quiz comes with 5
        hints, use them wisely. You may quit the test at any time. However in
        order to receive a score, you must finish all 30 questions. timer starts
        as soon as the game loads! Goodluck and Happy Studies!
      </p>
      <Col className="d-flex flex-column">
        <Button variant="primary" className="btn btn-block btn-primary btn-lg">
          <Link
            to="/quiz"
            className="ml-auto text-align-right"
            className="text-white"
          >
            <FontAwesomeIcon icon={faPlay} /> Take Test
          </Link>
        </Button>
        <Button
          onClick={() => props.onChangeKey("second")}
          variant="primary"
          className="btn btn-block btn-primary btn-lg"
        >
          <Link className="ml-auto text-align-right" className="text-white">
            <FontAwesomeIcon icon={faGraduationCap} /> Study
          </Link>
        </Button>
      </Col>
    </Jumbotron>
  </Fragment>
);

export default QuizInstructions;
