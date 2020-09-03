import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

import "./styles.css";

import Register from "./containers/Register";
import Login from "./containers/Login";

const LoginPage = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      props.history.push("home");
    } else {
      props.history.push("/");
    }
    setLoaded(true);
  }, [props.history]);

  const renderLoginChoices = () => {
    if (!showLogin && !showRegister) {
      return (
        <Container>
          <Row>
            <Col>
              <Card className="m-5 p-md-5 p-xs-0" id="landing">
                <Card.Body>
                  <Card.Title>PART 107 - Commercial UAS Study Guide</Card.Title>
                  <Card.Text>
                    Prepare and pass your Commercial Drone License exam the
                    FIRST TIME!
                  </Card.Text>
                </Card.Body>
                <Card.Body className="text-right">
                  <Button
                    className="mr-2 login-button"
                    onClick={() => setShowLogin(!showLogin)}
                  >
                    Login
                  </Button>
                  <Button
                    id="register"
                    onClick={() => setShowRegister(!showRegister)}
                  >
                    Register
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  const renderBack = () => {
    return (
      <div
        onClick={() => {
          setShowLogin(false);
          setShowRegister(false);
        }}
      >
        <i className="fas fa-angle-left"></i>
      </div>
    );
  };

  const toggleRegisterLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const renderRegister = () => {
    if (showRegister) {
      return (
        <Register
          toggleRegisterLogin={toggleRegisterLogin}
          checkUser={props.checkUser}
          renderBack={renderBack}
        />
      );
    }
  };

  const renderLogin = () => {
    if (showLogin) {
      return (
        <Login
          toggleRegisterLogin={toggleRegisterLogin}
          checkUser={props.checkUser}
          renderBack={renderBack}
        />
      );
    }
  };

  if (!loaded) return <div></div>;

  return (
    <Fragment>
      <Helmet>
        <title>PART 107 - Commercial UAS Study Guide</title>
      </Helmet>
      <section id="login">
        {renderLoginChoices()}
        {renderRegister()}
        {renderLogin()}
      </section>
    </Fragment>
  );
};

export default withRouter(LoginPage);
