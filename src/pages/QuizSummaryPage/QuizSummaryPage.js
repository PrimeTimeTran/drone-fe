import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Button, Col } from "react-bootstrap";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      hintsUsed: 0,
      wrongAnswers: 0,
      videoSeen: false,
      correctAnswers: 0,
      fiftyFiftyUsed: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
    };
  }

  componentDidMount() {
    // window.fb.logEvent("quiz_end");
    const { state } = this.props.location;
    if (state) {
      this.setState({
        hintsUsed: state.hintsUsed,
        wrongAnswers: state.wrongCount,
        correctAnswers: state.correctCount,
        fiftyFiftyUsed: state.fiftyFiftyUsed,
        numberOfQuestions: state.numberOfQuestions,
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      });
    }
    // const interval = setInterval(() => {
    //   console.log("Interval");
    //   const go = document.getElementsByTagName("video");
    //   if (go[0] !== undefined) {
    //     console.log({gogogo: go[0]})
    //     document
    //       .getElementsByTagName("video")[0]
    //       .addEventListener("ended", this.myHandler, false);
    //   }
    // }, 3000);
    // document.getElementsByTagName("video");
  }

  // myHandler = (e) => {
  //   console.log("video over!");
  // };

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
          {/* <iframe
            allowFullScreen
            frameBorder="0"
            id="djiVideoAdd"
            title="djiVideoAdd"
            src="//show.dji.com/videos/NDgyNTM2ODcxNDpGU3I5bFBxZg==/embed?autoplay=1&loop=1"
            onLoad={() => {
              console.log("Loaded");
              console.log(document.getElementsByClassName("arrow"));
              const video = document.getElementsByTagName("video")[0];
              console.log({ video });
              if (video === undefined) {
                setInterval(() => {
                  console.log("looking for the video");
                }, 500);
              }
              if (video && true) {
                document
                  .getElementsByTagName("video")[0]
                  .setAttribute("muted", "muted");
                document.getElementsByClassName("arrow") &&
                  document.getElementsByClassName("arrow")[0] &&
                  document.getElementsByClassName("arrow")[0].click();
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              minWidth: "50vw",
              minHeight: "40vh",
            }}
          ></iframe> */}
          <a href="https://click.dji.com/AF65MGDd9f17kHVzABVwrw?pm=ad_image" target="_blank"><img src="https://u.djicdn.com/uploads/ad_image_file/file/4949/970x250.jpg"/></a>
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
