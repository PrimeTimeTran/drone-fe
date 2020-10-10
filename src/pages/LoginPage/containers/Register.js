import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { register } from "./UserFunctions";
import fb from "../../../utils/Firebase";

const Register = (props) => {
  const [captcha, setCaptcha] = useState(false);
  const [user, setUser] = useState({
    password: "",
    last_name: "",
    first_name: "",
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
      }, 100);
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
    if (captcha) {
      register(user).then((res) => {
        props.checkUser();
        window.location.replace(process.env.REACT_APP_SITE_URL);
        // window.fb.logEvent("register");
      });
    }
  };

  const onFbLogin = () => {
    fb.fbSignIn(props.checkUser, props.history.push);
  };

  const onGoogleSignin = () => {
    fb.googleSignIn(props.checkUser, props.history.push);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>{props.renderBack()}</Card.Header>
            <Card.Body>
              <Card.Title>Register</Card.Title>
              <Card.Text>
                Get back to studying to get your certification and change your
                life with drones.
              </Card.Text>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={onChange}
                    value={user.first_name}
                    className="form-control"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="email"
                    name="last_name"
                    onChange={onChange}
                    value={user.last_name}
                    className="form-control"
                    placeholder="Enter Last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
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
                <Col className="d-flex flex-column">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                  <Link
                    className="text-right my-2"
                    onClick={props.toggleRegisterLogin}
                  >
                    Have an account? Login
                  </Link>
                </Col>
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
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Register);
