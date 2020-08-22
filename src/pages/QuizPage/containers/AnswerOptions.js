import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

export default function AnswerOptions({ currentQuestion, handleSelectAnswer, gameOver }) {
  const [answerOptions, setAnswerOptions] = useState([]);

  useEffect(() => {
    const { optionA, optionB, optionC, optionD } = currentQuestion;
    const notShuffled = [optionA, optionB, optionC, optionD];

    const shuffled = notShuffled
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    setAnswerOptions(shuffled);
  }, [currentQuestion]);

  const renderAnswerOptions = () => {
    return answerOptions.map((answer, idx) => {
      return (
        <Col sm="6" key={idx}>
          <div
            onClick={() => handleSelectAnswer(answer)}
            className="d-flex justify-content-center align-items-center border option answer-button m-1 p-3"
          >
            <h4>{answer}</h4>
          </div>
        </Col>
      );
    });
  };

  return (
    <Container id="answer-container">
      <Row className="mb-3">{renderAnswerOptions()}</Row>
    </Container>
  );
}
