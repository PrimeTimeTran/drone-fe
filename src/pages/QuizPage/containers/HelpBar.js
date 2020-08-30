import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function HelpBar({
  time,
  hints,
  handleHints,
  numberOfQuestions,
  currentQuestionIdx,
}) {
  let number = currentQuestionIdx + 1
  if (currentQuestionIdx === numberOfQuestions) number = numberOfQuestions

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={6} className="d-flex justify-content-start">
            <h1>
              {number} of {numberOfQuestions}
            </h1>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <h1>{time}</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Button onClick={handleHints}>
              <span>Hints({hints})</span>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
