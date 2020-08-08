import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Chart from "../../components/Chart";

import { getQuizHistory } from "../../api";

export default function () {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    window.fb.logEvent("page_view", { value: "quiz_history" });
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
