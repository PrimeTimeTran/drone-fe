import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import { postQuestion } from "../api";
import { showToast } from "../utils";
import Toast from "../components/Toast";

const placeHolders = ["Incorrect Answer", "Plausible Answer", "Correct Answer"];

const shuffledPlaceholders = placeHolders
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

const CreateQuestion = (props) => {
  const [question, setQuestion] = useState({
    answer: "",
    optionA: "",
    optionB: "",
    optionC: "",
    question: "",
    photo_url: "",
  });

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const addQuestion = (e) => {
    e.preventDefault();

    postQuestion(question).then((resp) => {
      if (resp.status === 201) {
        window.fb.logEvent("question_create");
        setQuestion({
          answer: "",
          optionA: "",
          optionB: "",
          optionC: "",
          question: "",
          photo_url: "",
        });
        props.onCreateQuestion();
        showToast(true, 'Question Created!');
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form noValidate onSubmit={addQuestion}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Add New Question Body</Form.Label>
              <Form.Control
                type="text"
                name="question"
                onChange={onChange}
                className="form-control"
                value={question.question}
                placeholder="What's an interesting question?"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    type="text"
                    name="optionA"
                    onChange={onChange}
                    className="form-control"
                    value={question.optionA}
                    placeholder={shuffledPlaceholders[0]}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    rows="3"
                    name="optionB"
                    onChange={onChange}
                    className="form-control"
                    value={question.optionB}
                    placeholder={shuffledPlaceholders[1]}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    rows="3"
                    name="optionC"
                    onChange={onChange}
                    className="form-control"
                    value={question.optionC}
                    placeholder={shuffledPlaceholders[2]}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                rows="3"
                name="photo_url"
                onChange={onChange}
                className="form-control"
                value={question.photo_url}
                placeholder="Image URL"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                rows="3"
                name="answer"
                onChange={onChange}
                className="form-control"
                value={question.answer}
                placeholder="Enter Answer"
              />
            </Form.Group>
            <button
              type="submit"
              id="login-button"
              className="btn btn-primary btn-lg btn-block my-3"
            >
              Create
            </button>
            <Toast />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(CreateQuestion);
