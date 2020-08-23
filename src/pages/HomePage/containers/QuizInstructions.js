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
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <Col className="d-flex flex-column">
        <Button variant="primary" className="btn btn-block btn-primary btn-lg">
          <Link to="/quiz" className="ml-auto text-align-right" className="text-white">
            <FontAwesomeIcon icon={faPlay} /> Take Test
          </Link>
        </Button>
        <Button onClick={() => props.onChangeKey('second')} variant="primary" className="btn btn-block btn-primary btn-lg">
          <Link className="ml-auto text-align-right" className="text-white">
            <FontAwesomeIcon icon={faGraduationCap} /> Study
          </Link>
        </Button>
      </Col>
    </Jumbotron>
  </Fragment>
);

export default QuizInstructions;
