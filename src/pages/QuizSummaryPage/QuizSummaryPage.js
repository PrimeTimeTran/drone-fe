import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Button, Col } from "react-bootstrap";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      fiftyFiftyUsed: 0,
    };
  }

  componentDidMount() {
    // window.fb.logEvent("quiz_end");
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        correctAnswers: state.correctCount,
        wrongAnswers: state.wrongCount,
        hintsUsed: state.hintsUsed,
        fiftyFiftyUsed: state.fiftyFiftyUsed,
      });
    }
  }

  render() {
    const { state } = this.props.location;
    let stats, remark;

    if (this.state.score <= 30) {
      remark = "You need more practice";
    } else if (this.state.score > 30 && this.state.score <= 50) {
      remark = "Better luck next time";
    } else if (this.state.score <= 70 && this.state.score > 50) {
      remark = "You can do better";
    } else if (this.state.score >= 71 && this.state.score <= 84) {
      remark = "You did great!";
    } else {
      remark = "You're an absolute genius";
    }

    if (state !== undefined) {
      stats = (
        <Container className="pt-5">
          <div>
            <span
              style={{ display: "flex", justifyContent: "center" }}
              className="mdi mdi-check-circle-outline success-icon"
            ></span>
          </div>
          <h1>Quiz has Ended</h1>
          <div className="container stats">
            <h4>{remark}</h4>
            <h2> Your Score: {this.state.score.toFixed(0)} &#37;</h2>
            <span className="stat left">Total Number of Questions:</span>
            <span className="right">{this.state.numberOfQuestions}</span>
            <br />

            <span className="stat left">
              Total Number of Answered Questions:
            </span>
            <span className="right">
              {this.state.numberOfAnsweredQuestions}
            </span>
            <br />

            <span className="stat left">Total Number of Correct Answers:</span>
            <span className="right">{this.state.correctAnswers}</span>
            <br />

            <span className="stat left">Total Number of Wrong Answers:</span>
            <span className="right">{this.state.wrongAnswers}</span>
            <br />

            <span className="stat left">Hints Used:</span>
            <span className="right">{this.state.hintsUsed}</span>
            <br />

            <span className="stat left">50/50 Used</span>
            <span className="right">{this.state.fiftyFiftyUsed}</span>
            <br />
          </div>
          <Container>
            <Row className="justify-content-sm-center">
              <Col>
                <Link to="/home" className="btn btn-block">
                  <Button block size="lg" variant="primary">
                    Home
                  </Button>
                </Link>
                <Link to="/quiz" className="btn btn-block">
                  <Button block size="lg" variant="success">
                    Play Again
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Container>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No Statistics Available</h1>

              <Link to="/quiz"> Take a Quiz</Link>
              <Link to="/"> Back to Home</Link>
        </section>
      );
    }
    return (
      <Container className="border">
        <Helmet>
          <title>Quiz App - Summary</title>
        </Helmet>
        <div className="quiz-summary">{stats}</div>
      </Container>
    );
  }
}

export default withRouter(QuizSummary);
