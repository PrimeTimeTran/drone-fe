import React, { Component } from "react";
import { postNewQuestion } from "./InputQuestionsFunctions";
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";

class InputQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addQuestion = (e) => {
    e.preventDefault();
    const updatedQuestion = {
      question: this.state.question,
      optionA: this.state.optionA,
      optionB: this.state.optionB,
      optionC: this.state.optionC,
      optionD: this.state.optionD,
      answer: this.state.answer,
    };

    postNewQuestion(updatedQuestion).then((res) => {
      this.props.history.push("/home");
    });
  }

  render() {
    return (
      <Form noValidate onSubmit={this.addQuestion}>
        <Form.Group controlId="exampleForm.ControlSelect2"></Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter Your Question Here </Form.Label>
          <Form.Control
            rows="3"
            type="text"
            as="textarea"
            name="question"
            onChange={this.onChange}
            className="form-control"
            placeholder="Question Here"
            value={this.state.question}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Option A</Form.Label>
          <Form.Control
            rows="3"
            type="text"
            as="textarea"
            name="optionA"
            className="form-control"
            onChange={this.onChange}
            value={this.state.optionA}
            placeholder="Enter First Option"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Option B</Form.Label>
          <Form.Control
            rows="3"
            as="textarea"
            name="optionB"
            className="form-control"
            onChange={this.onChange}
            value={this.state.optionB}
            placeholder="Enter Second Option"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Option C</Form.Label>
          <Form.Control
            rows="3"
            as="textarea"
            name="optionC"
            className="form-control"
            onChange={this.onChange}
            value={this.state.optionC}
            placeholder="Enter Third Option"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Option D</Form.Label>
          <Form.Control
            rows="3"
            as="textarea"
            name="optionD"
            className="form-control"
            onChange={this.onChange}
            value={this.state.optionD}
            placeholder="Enter Fourth Option"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            Enter Correct Answer Here (must be one of the options defined)
          </Form.Label>
          <Form.Control
            rows="3"
            as="textarea"
            name="answer"
            onChange={this.onChange}
            className="form-control"
            value={this.state.answer}
            placeholder="Enter Answer"
          />
        </Form.Group>
        <button
          type="submit"
          id="login-button"
          className="btn btn-lg btn-block"
        >
          Add Question
        </button>
      </Form>
    );
  }
}

export default withRouter(InputQuestions);
