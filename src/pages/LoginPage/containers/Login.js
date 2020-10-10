import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HCaptcha from '@hcaptcha/react-hcaptcha';

import fb from "../../../utils/Firebase";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

import { login } from "./UserFunctions";

const Login = (props) => {
  const [captcha, setCaptcha] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const container = document.getElementById("recaptcha");
    if (container) {
      setTimeout(() => {
        const captchaContainer = container.firstChild;
        if (captchaContainer) {
          captchaContainer.classList.add("d-flex");
          captchaContainer.classList.add("justify-content-center");
        }
      }, 250);
    }
  }, []);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // window.fb.logEvent("log_in");

    if (captcha) {
      login(user).then((res) => {
        if (res) {
          props.checkUser();
          props.history.push("/home");
        }
      });
    }
  };

  const onFbLogin = () => {
    fb.fbSignIn(props.checkUser, props.history.push)
  }

  const onGoogleSignin = () => {
    fb.googleSignIn(props.checkUser, props.history.push)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>{props.renderBack()}</Card.Header>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Card.Text>
                Get back to studying and get your Part 107 remote pilot licence.
              </Card.Text>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Enter"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    value={user.password}
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <HCaptcha
                  sitekey={process.env.REACT_APP_HCAPTCHA_KEY}
                  onVerify={token => console.log(token)}
                />
                {/* <ReCAPTCHA
                  id="recaptcha"
                  className="my-3"
                  onChange={() => setCaptcha(true)}
                  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                /> */}
                <Row>
                  <Col className="d-flex flex-column">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    <Row className="p-3">
                      <Col className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="primary"
                          onClick={onFbLogin}
                          className="btn btn-block"
                        >
                          <FontAwesomeIcon
                            color="white"
                            icon={["fab", "facebook"]}
                            className="mr-1"
                          />
                          Facebook
                        </Button>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="primary"
                          onClick={onGoogleSignin}
                          className="btn btn-block"
                        >
                          <FontAwesomeIcon
                            color="white"
                            icon={["fab", "google"]}
                            className="mr-1"
                          />
                          Google
                        </Button>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-between mx-5 my-3 align-items-center">
                      <Link
                        onClick={props.toggleRegisterLogin}
                        className="text-right my-2"
                      >
                        Need an account? Register
                      </Link>
                      <Link to="/reset-password" className="text-right">
                        Forgot Password?
                      </Link>
                    </Row>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
