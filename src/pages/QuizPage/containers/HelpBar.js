import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function HelpBar({
  time,
  hints,
  fiftyFifty,
  handleHints,
  handleFiftyFifty,
  numberOfQuestions,
  currentQuestionIdx,
}) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button onClick={handleFiftyFifty}>
              <span>{fiftyFifty} 50 / 50</span>
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button onClick={handleHints}>
              <span>{hints} Remove 1</span>
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="timer-container">
        <p>
          <span>
            {currentQuestionIdx + 1} of {numberOfQuestions}{" "}
          </span>
          <span>
            {time.minutes}:{time.seconds}
          </span>
        </p>
      </div>
    </>
  );
}
