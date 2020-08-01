import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const QuizInstructions = (props) => (
  <Fragment>
    <Jumbotron>
      <h1>Welcome {props.name}</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p className="d-flex">
        <Link to="/quiz" className="ml-auto text-align-right">
          <Button variant="primary" className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faPlay} /> Play
          </Button>
        </Link>
      </p>
    </Jumbotron>
  </Fragment>
);

export default QuizInstructions;
