import React from "react";
import classnames from "classnames";
import { Container, Button } from "react-bootstrap";

export default function ControlOptions({
  handleNav,
  handleQuit,
  disableNextButton,
  previousButtonDisabled,
}) {
  return (
    <Container className="d-flex justify-content-sm-around">
      <Button
        onClick={handleNav}
        className={classnames("go", {
          disable: previousButtonDisabled,
        })}
      >
        Previous
      </Button>
      <Button
        onClick={() => handleNav('forward') }
        className={classnames("", {
          disable: disableNextButton,
        })}
      >
        Next
      </Button>
      <Button
        onClick={handleQuit}
        className={classnames("btn-danger", {
          disable: disableNextButton,
        })}
      >
        Quit
      </Button>
    </Container>
  );
}
