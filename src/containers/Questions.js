import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Col, Row, Card, ListGroup } from "react-bootstrap";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { deleteQuestion } from "../components/InputQuestionsFunctions";

export default function Questions() {
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
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

  const renderItem = (answer, option) => {
    const correct = option.toLowerCase() === answer.toLowerCase();
    const classNames = 'mr-3 ' + (correct ? 'text-success' : 'text-danger')
    return (
      <ListGroup.Item>
        {" "}
        <FontAwesomeIcon
          className={classNames}
          icon={correct ? faCheckCircle : faTimesCircle}
        />
        {option}
      </ListGroup.Item>
    );
  };

  const renderQuestions = () => {
    return questions.map(
      ({ question, answer, optionA, optionB, optionC, optionD }) => {
        return (
          <Col md={4}>
            <Card className="mb-3">
              <Card.Header className="font-weight-bold">{question}</Card.Header>
              <ListGroup>
                {renderItem(answer, optionA)}
                {renderItem(answer, optionB)}
                {renderItem(answer, optionC)}
                {renderItem(answer, optionD)}
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>{answer}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        );
      }
    );
  };
  return (
    <Container className="p-5">
      <Row>{renderQuestions()}</Row>
    </Container>
  );
}
