import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import "./styles.css";

import Register from "./containers/Register";
import Login from "./containers/Login";

const LoginPage = (props) => {
  console.log({ loi: props });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      props.history.push("home");
    } else {
      props.history.push("/");
    }
  }, [props.history]);

  const renderLoginChoices = () => {
    if (!showLogin && !showRegister) {
      return (
        <Card>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>PART 107 - Commercial UAS Study Guide</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <Card.Body className="text-right">
            <Link variant="primary" onClick={() => setShowLogin(!showLogin)}>
              <Button>Login</Button>
            </Link>
            <Link
              variant="primary"
              className="ml-3"
              onClick={() => setShowRegister(!showRegister)}
            >
              <Button>Register</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    }
  };

  const renderBack = () => {
    if (showLogin || showRegister) {
      return (
        <div
          className="back-button"
          onClick={() => {
            setShowLogin(false);
            setShowRegister(false);
          }}
        >
          <i className="fas fa-angle-left"></i>
        </div>
      );
    }
  };

  const renderRegister = () => {
    if (showRegister) {
      return <Register checkUser={props.checkUser} />;
    }
  };

  const renderLogin = () => {
    if (showLogin) {
      return <Login checkUser={props.checkUser} />;
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>PART 107 - Commercial UAS Study Guide</title>
      </Helmet>
      {renderBack()}
      {renderLoginChoices()}
      {renderRegister()}
      {renderLogin()}
    </Fragment>
  );
};

export default withRouter(LoginPage);
