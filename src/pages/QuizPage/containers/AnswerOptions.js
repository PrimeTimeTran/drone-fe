import React from "react";

import Button from "../components/Button";
import { Container, Row, Col } from "react-bootstrap";

export default function AnswerOptions({ currentQuestion, handleSelectAnswer }) {
  return (
    <Container>
      <Row>
        <Col>
          <Button
            onClick={handleSelectAnswer}
            option={currentQuestion.optionB}
          />
        </Col>
        <Col>
          <Button
            onClick={handleSelectAnswer}
            option={currentQuestion.optionA}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={handleSelectAnswer}
            option={currentQuestion.optionC}
          />
        </Col>
        <Col>
          <Button
            onClick={handleSelectAnswer}
            option={currentQuestion.optionD}
          />
        </Col>
      </Row>
    </Container>
  );
}
