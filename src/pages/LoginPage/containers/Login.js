import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

import { login } from "./UserFunctions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verifiedCaptcha: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const container = document.getElementById("recaptcha");
    if (container) {
      console.log({ container });
      setTimeout(() => {
        const captchaContainer = container.firstChild;
        if (captchaContainer) {
          console.log({ captchaContainer });
          captchaContainer.classList.add("d-flex");
          captchaContainer.classList.add("justify-content-center");
        }
      }, 100);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log({ la: this.state.verifiedCaptcha });

    if (this.state.verifiedCaptcha) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      login(user).then((res) => {
        if (res) {
          this.props.checkUser();
          this.props.history.push("/home");
        }
      });
    }
  };

  onRecaptcha = async (e) => {
    this.setState({ verifiedCaptcha: true });
  };

  render() {
    console.log({ state: this.state });
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              {this.props.renderBack()}
              <Card.Body className="text-center">
                <Card.Header as="h5">Sign In</Card.Header>
              </Card.Body>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={this.onChange}
                      placeholder="Enter password"
                      value={this.state.password}
                    />
                  </div>
                  <ReCAPTCHA
                    id="recaptcha"
                    className="my-3"
                    onChange={this.onRecaptcha}
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                  />
                  <Row>
                    <Col className="d-flex flex-column">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                      <Link to="/reset-password" className="text-right">
                        Forgot Password?
                      </Link>
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
