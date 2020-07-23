import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Chart from "../../components/Chart";

import { getQuizHistory } from "../../api";

export default function QuizHistoryPage() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    async function getQuizzes() {
      const quizArray = await getQuizHistory();
      setQuizzes(quizArray);
    }
    getQuizzes();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Chart data={quizzes} />;
        </Col>
      </Row>
    </Container>
  );
}
