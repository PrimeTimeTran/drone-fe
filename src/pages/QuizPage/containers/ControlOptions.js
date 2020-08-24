import React from "react";
import { Container, Button } from "react-bootstrap";

export default function ControlOptions({
  handleNav,
  handleQuit,
  disableNextButton,
  disablePrevButton,
}) {
  return (
    <Container className="d-flex justify-content-sm-around">
      {/* <Button disabled={disablePrevButton} onClick={handleNav}>
        Previous
      </Button>
      <Button disabled={disableNextButton} onClick={() => handleNav("forward")}>
        Next
      </Button> */}
      <Button onClick={handleQuit} className="btn-danger">
        Quit
      </Button>
    </Container>
  );
}
