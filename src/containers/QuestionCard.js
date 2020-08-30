import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Card, Form, Button, ListGroup, Dropdown } from "react-bootstrap";
import {
  faCog,
  faEdit,
  faTrash,
  faCheckCircle,
  faTimesCircle,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";

import { updateQuestion } from "../api";

export default function QuestionCard({
  _id,
  user,
  owner,
  answer,
  optionA,
  optionB,
  optionC,
  question,
  subtitle,
  photo_url,
  removeItem,
  updateItem,
  showAnswers,
}) {
  const [editing, setEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    _id,
    answer,
    optionA,
    optionB,
    optionC,
    question,
  });

  const renderOwnerOptions = (ownerId, questionId) => {
    if (ownerId === user._id) {
      return (
        <Dropdown alignRight>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FontAwesomeIcon icon={faCog} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setEditing(!editing)}>
              <FontAwesomeIcon icon={faEdit} className="mr-1" />
              Edit
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-danger"
              onClick={() => removeItem(questionId)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  const renderItem = (answer, option) => {
    const correct = option.toLowerCase() === answer.toLowerCase();
    const classNames =
      "mr-3 text-black " +
      (showAnswers && (correct ? "text-success" : "text-danger"));
    const icon = showAnswers
      ? correct
        ? faCheckCircle
        : faTimesCircle
      : faDotCircle;
    return (
      <ListGroup.Item>
        <FontAwesomeIcon icon={icon} className={classNames} />
        {option}
      </ListGroup.Item>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQuestion({ ...updatedQuestion, [name]: value });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const resp = await updateQuestion(updatedQuestion);
    if (resp.status === 201) {
      updateItem(resp.data);
      setEditing(!editing);
    }
  };

  if (editing) {
    return (
      <Col md={12} key={_id}>
        <Card className="mb-3">
          <Card.Header className="font-weight-bold d-flex justify-content-between">
            <Form.Control
              name="question"
              onChange={handleChange}
              value={updatedQuestion.question}
            />
            {renderOwnerOptions(owner, _id)}
          </Card.Header>
          <Form noValidate onSubmit={handleSubmitEdit}>
            <ListGroup>
              <ListGroup.Item>
                <Form.Control
                  name="optionA"
                  onChange={handleChange}
                  value={updatedQuestion.optionA}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Control
                  name="optionB"
                  onChange={handleChange}
                  value={updatedQuestion.optionB}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Control
                  name="optionC"
                  onChange={handleChange}
                  value={updatedQuestion.optionC}
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <Form.Control
                  name="answer"
                  onChange={handleChange}
                  value={updatedQuestion.answer}
                />
              </ListGroup.Item>
            </ListGroup>
            <Button type="submit" className="m-3">
              Save
            </Button>
          </Form>
        </Card>
      </Col>
    );
  } else {
    return (
      <Col md={12} key={_id}>
        <Card className="mb-3">
          <Card.Header className="font-weight-bold d-flex justify-content-between">
            {question}
            {renderOwnerOptions(owner, _id)}
          </Card.Header>
          {photo_url && (
            <Card.Header className="d-flex justify-content-end">
              {photo_url && (
                <ListGroup>
                  <a rel="noopener noreferrer" href={photo_url} target="_blank">
                    {subtitle}
                  </a>
                </ListGroup>
              )}
            </Card.Header>
          )}
          <ListGroup>
            {renderItem(answer, optionA)}
            {renderItem(answer, optionB)}
            {renderItem(answer, optionC)}
            <ListGroup.Item className="text-center font-italic">
              {showAnswers ? answer : "?"}
            </ListGroup.Item>
          </ListGroup>
          {/* <ListGroup className="align-items-center">

          </ListGroup> */}
        </Card>
      </Col>
    );
  }
}
