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
        <section id="login">
          <Container>
            <Row>
              <Col>
                <Card className="m-5 p-5">
                  <Card.Body>
                    <Card.Title>
                      PART 107 - Commercial UAS Study Guide
                    </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
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
        </section>
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

  const renderRegister = () => {
    if (showRegister) {
      return <Register checkUser={props.checkUser} renderBack={renderBack} />;
    }
  };

  const showRegisterOption = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const renderLogin = () => {
    if (showLogin) {
      return <Login showRegisterOption={showRegisterOption} checkUser={props.checkUser} renderBack={renderBack} />;
    }
  };

  if (!loaded) return <div></div>;

  return (
    <Fragment>
      <Helmet>
        <title>PART 107 - Commercial UAS Study Guide</title>
      </Helmet>
      {renderLoginChoices()}
      {renderRegister()}
      {renderLogin()}
    </Fragment>
  );
};

export default withRouter(LoginPage);
