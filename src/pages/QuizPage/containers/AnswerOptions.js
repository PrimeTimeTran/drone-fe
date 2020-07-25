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
    return answerOptions.map((answer) => {
      return (
        <Col sm="6" key={answer}>
          <div
            onClick={() => handleSelectAnswer(answer)}
            className="d-flex justify-content-center align-items-center border option answer-button m-1"
          >
            <h2>{answer}</h2>
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
