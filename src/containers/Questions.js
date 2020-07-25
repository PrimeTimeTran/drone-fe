import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Col, Row, Card, ListGroup } from "react-bootstrap";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { deleteQuestion } from "../components/InputQuestionsFunctions";
import { getQuestions } from '../api'

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await getQuestions();
      setQuestions(questions)
    }
    fetchQuestions()
  }, []);

  const deletedQuestion = (id) => {
    deleteQuestion(id).then((res) => {
      history.push("/home");
    });
  };

  const renderItem = (answer, option) => {
    const correct = option.toLowerCase() === answer.toLowerCase();
    const classNames = "mr-3 " + (correct ? "text-success" : "text-danger");
    return (
      <ListGroup.Item>
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
      ({ _id, question, answer, optionA, optionB, optionC, optionD }) => {
        return (
          <Col md={4} key={_id}>
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
