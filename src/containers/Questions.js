import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Card, ListGroup } from "react-bootstrap";

import { deleteQuestion } from "../components/InputQuestionsFunctions";

export default function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const res = await Axios.get(
        process.env.REACT_APP_SERVER_URL + "/questions/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setQuestions(res.data);
    } catch (e) {
      console.log("error while geting questions", e);
    }
  }

  const deletedQuestion = (id) => {
    deleteQuestion(id).then((res) => {
      history.push("/home");
    });
  };

  const renderQuestions = () => {
    return questions.map((question) => {
      return (
        <Col md={4}>
          <Card className="mb-3">
            <Card.Header>{question.question}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>{question.answer}</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      );
    });
  };
  return (
    <Container className="p-5">
      <Row>{renderQuestions()}</Row>
    </Container>
  );
}
