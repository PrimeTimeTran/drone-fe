import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      verifiedCaptcha: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    if (this.state.verifiedCaptcha) {
      register(user).then((res) => {
        this.props.checkUser();
        window.location.replace(process.env.REACT_APP_SITE_URL);
      });
    }
  }

  onRecaptcha = async (e) => {
    this.setState({ verifiedCaptcha: true });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>{this.props.renderBack()}</Card.Header>
              <Card.Body>
                <Card.Title>Register</Card.Title>
                <Card.Text>
                Get back to studying to get your certification and change your life with drones.
                </Card.Text>
                <form noValidate onSubmit={(e) => this.onSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      onChange={this.onChange}
                      placeholder="Enter First Name"
                      value={this.state.first_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="email"
                      name="last_name"
                      className="form-control"
                      onChange={this.onChange}
                      placeholder="Enter Last name"
                      value={this.state.last_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
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
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </form>
              </Card.Body>
            </Card>
            <ReCAPTCHA
              onChange={this.onRecaptcha}
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
