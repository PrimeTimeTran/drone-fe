import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import {
  faCog,
  faEdit,
  faTrash,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { getQuestions, deleteQuestion } from "../api";

export default function Questions(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const questions = await getQuestions();
      setQuestions(questions);
    }
    fetchQuestions();
  }, []);

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

  const removeItem = async (questionId) => {
    const resp = await deleteQuestion(questionId)
    if (resp.status === 201) {
      const newQuestions = questions.filter(q => q._id !== questionId)
      setQuestions(newQuestions)
      window.fb.logEvent("question_remove");
    }
  }

  const renderOwnerOptions = (ownerId, questionId) => {
    if (ownerId === props.user._id) {
      return (
        <Dropdown alignRight>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FontAwesomeIcon icon={faCog} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <FontAwesomeIcon icon={faEdit} className="mr-1" />
              Edit
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => removeItem(questionId)} className="text-danger">
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  const renderQuestions = () => {
    return questions.map(
      ({
        _id,
        question,
        answer,
        optionA,
        optionB,
        optionC,
        optionD,
        owner,
      }) => {
        return (
          <Col md={12} key={_id}>
            <Card className="mb-3">
              <Card.Header className="font-weight-bold d-flex justify-content-between">
                {question}
                {renderOwnerOptions(owner, _id)}
              </Card.Header>
              <ListGroup>
                {renderItem(answer, optionA)}
                {renderItem(answer, optionB)}
                {renderItem(answer, optionC)}
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
