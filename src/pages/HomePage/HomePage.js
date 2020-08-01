import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Tab,
  Row,
  Col,
  Nav,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHistory,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import QuizHistoryPage from "../HistoryPage";

import QuizInstructions from "./containers/QuizInstructions";
import CreateQuestion from "../../containers/CreateQuestion";
import QuestionsContainer from "../../containers/Questions";

class HomePage extends Component {
  componentDidMount() {
    if (!this.props.user) return this.props.history.push("/");
  }
  render() {
    return (
      <Tab.Container id="main" defaultActiveKey="first" className="border mt-5">
        <Container fluid>
          <Row>
            <Col sm={2} className="pt-sm-3">
              <Nav variant="pills" className="flex-sm-row flex-md-column my-2">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <FontAwesomeIcon icon={faQuestionCircle} /> Questions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <FontAwesomeIcon icon={faHistory} /> History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="border">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="container pt-5">
                    <QuizInstructions name={this.props.user.first_name}/>
                    <h2 style={{ textAlign: "center" }}>
                      Create New Questions Here!
                    </h2>
                    <CreateQuestion user={this.props.user}/>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="p-5">
                  <h1>My Questions</h1>
                  <QuestionsContainer />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h1>History</h1>
                  <QuizHistoryPage />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    );
  }
}

export default withRouter(HomePage);
