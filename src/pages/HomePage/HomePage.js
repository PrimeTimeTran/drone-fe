import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QuizInstructions from "../../components/quiz/QuizInstructions";
import InputQuestions from "../../components/InputQuestions";
import Chart from "../../components/Chart";
import Questions from "../../components/Questions";

class HomePage extends Component {
  componentDidMount() {
    console.log('Home page', this.props.user)
    if (!this.props.user) return this.props.history.push("/");
  }
  render() {
    return (
      <div className="container pt-5">
        <h2 style={{ textAlign: "center" }}>
          {" "}
          Welcome {this.props.user.first_name}!
        </h2>
        <Chart />
        <QuizInstructions />
        <h2 style={{ textAlign: "center" }}>Create New Questions Here!</h2>
        <InputQuestions />
        <h2 style={{ textAlign: "center" }}>Questions and Answers</h2>
        <Questions />
      </div>
    );
  }
}

export default withRouter(HomePage);
