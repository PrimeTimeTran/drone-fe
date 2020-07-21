import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";

import Register from "./containers/Register";
import Login from "./containers/Login";

function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      this.props.history.push("profile");
    }
  }, []);

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

  const renderRegister = () => {
    if (showRegister) {
      return <Register />;
    }
  };

  const renderLogin = () => {
    if (showLogin) {
      return <Login />;
    }
  };

  return (
    <div className="mt-5 pt-5">
      <Fragment>
        <Helmet>
          <title>PART 107 - Commercial UAS Study Guide</title>
        </Helmet>
        <div id="home">
          <section>
            {renderLoginChoices()}
            {renderRegister()}
            {renderLogin()}
          </section>
        </div>
      </Fragment>
    </div>
  );
}

export default withRouter(LoginPage);
