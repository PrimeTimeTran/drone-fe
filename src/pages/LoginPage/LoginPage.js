import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";

import "./styles.css";

import Register from "./containers/Register";
import Login from "./containers/Login";

const LoginPage = (props) => {
  console.log({loi:props})
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
        <>
          <div style={{ textAlign: "center" }}>
            <span>
              <span className="mdi mdi-quadcopter cube"></span>
            </span>
          </div>
          <h1>PART 107 - Commercial UAS Study Guide </h1>
          <div className="auth-container">
            <Link
              id="login-button"
              variant="primary"
              className="auth-buttons"
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </Link>
            <Link
              variant="primary"
              id="signup-button"
              className="auth-buttons"
              onClick={() => setShowRegister(!showRegister)}
            >
              Register
            </Link>
          </div>
        </>
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
    <div className="mt-5 pt-5">
      <Fragment>
        <Helmet>
          <title>PART 107 - Commercial UAS Study Guide</title>
        </Helmet>
          <section>
            {renderBack()}
            {renderLoginChoices()}
            {renderRegister()}
            {renderLogin()}
          </section>
      </Fragment>
    </div>
  );
};

export default withRouter(LoginPage);
