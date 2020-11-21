import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import Chart from "../../components/Chart";

import { getQuizHistory } from "../../api";

export default function () {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    // window.fb.logEvent("page_view", { value: "quiz_history" });
    async function getQuizzes() {
      const quizArray = await getQuizHistory();
      setQuizzes(quizArray);
    }
    getQuizzes();
  }, []);

  return (
    <Container className="d-flex justify-content-center flex-column">
      <a
        target="_blank"
        className="align-self-center"
        href="https://click.dji.com/AGlsT4x0qbq2wNwvR9ggBg?pm=ad_image"
      >
        <img
          alt="ad"
          style={{ margin: 15 }}
          className="align-self-center"
          src="https://u.djicdn.com/uploads/ad_image_file/file/4200/970-250-a_%E5%8F%8C%E4%BA%BA.jpg"
        />
      </a>
      <Row>
        <Col>
          <Chart data={quizzes} />;
        </Col>
      </Row>
    </Container>
  );
}
