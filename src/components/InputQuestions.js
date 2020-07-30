import React, { useEffect, useState } from "react";
import { postNewQuestion } from "./InputQuestionsFunctions";
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";

const InputQuestions = () => {
  const [question, setQuestion] = useState({
    answer: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    question: "",
  });

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const addQuestion = (e) => {
    e.preventDefault();

    postNewQuestion(question).then((res) => {
      this.props.history.push("/home");
    });
  };
  console.log({ question });

  return (
    <Form noValidate onSubmit={addQuestion}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Your Question Here </Form.Label>
        <Form.Control
          rows="3"
          type="text"
          name="question"
          onChange={onChange}
          className="form-control"
          placeholder="Question Here"
          value={question.question}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Option A</Form.Label>
        <Form.Control
          rows="3"
          type="text"
          name="optionA"
          className="form-control"
          onChange={onChange}
          value={question.optionA}
          placeholder="Enter First Option"
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Option B</Form.Label>
        <Form.Control
          rows="3"
          name="optionB"
          className="form-control"
          onChange={onChange}
          value={question.optionB}
          placeholder="Enter Second Option"
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Option C</Form.Label>
        <Form.Control
          rows="3"
          name="optionC"
          className="form-control"
          onChange={onChange}
          value={question.optionC}
          placeholder="Enter Third Option"
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Option D</Form.Label>
        <Form.Control
          rows="3"
          name="optionD"
          className="form-control"
          onChange={onChange}
          value={question.optionD}
          placeholder="Enter Fourth Option"
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          Enter Correct Answer Here (must be one of the options defined)
        </Form.Label>
        <Form.Control
          rows="3"
          name="answer"
          onChange={onChange}
          className="form-control"
          value={question.answer}
          placeholder="Enter Answer"
        />
      </Form.Group>
      <button type="submit" id="login-button" className="btn btn-lg btn-block">
        Add Question
      </button>
    </Form>
  );
};

export default withRouter(InputQuestions);
