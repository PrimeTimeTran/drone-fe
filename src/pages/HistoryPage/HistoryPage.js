import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Chart from "../../components/Chart";

export default function QuizHistoryPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Chart />
        </Col>
      </Row>
    </Container>
  );
}
