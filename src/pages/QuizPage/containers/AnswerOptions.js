import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

export default function AnswerOptions({ currentQuestion, handleSelectAnswer }) {
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
        <Col
          sm="6"
          onClick={() => handleSelectAnswer(answer)}
          className="d-flex justify-content-center border p-5 option"
        >
          <h3>{answer}</h3>
        </Col>
      );
    });
  };

  return (
    <Container>
      <Row className="mb-3">{renderAnswerOptions()}</Row>
    </Container>
  );
}
