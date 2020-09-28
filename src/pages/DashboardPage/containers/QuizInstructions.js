import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Jumbotron, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const QuizInstructions = (props) => (
  <Fragment>
    <Jumbotron>
      <h1>Welcome {props.name || "Anonymous"}</h1>
      <p>
        Each test lasts for 12 minutes and ends when your time elapses. Every
        question contains 3 possible answers. Although you don't have such a
        feature on the real Part 107 test. The quiz comes with 5 hints, use them
        wisely. You may quit the test at any time. However in order to receive a
        score, you must finish all 30 questions. timer starts as soon as the
        game loads! Good luck and Happy Studies!
      </p>
      <Col>
        <Row className="d-flex justify-content-around">
          <Button variant="primary" onClick={() => props.onChangeKey("second")}>
            <Link className="text-white">
              <FontAwesomeIcon icon={faGraduationCap} /> Study
            </Link>
          </Button>
          <Button variant="primary">
            <Link to="/quiz" className="text-white">
              <FontAwesomeIcon icon={faPlay} /> Take Test
            </Link>
          </Button>
        </Row>
      </Col>
    </Jumbotron>
  </Fragment>
);

export default QuizInstructions;
