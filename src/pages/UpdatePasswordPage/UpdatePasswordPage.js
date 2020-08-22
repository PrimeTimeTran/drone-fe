import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

import { updatePassword} from '../../api'

export default function (props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setError("");
      const response = await updatePassword({password}, props.match.params.token)
      if (response.status === 200)  {
        window.location.replace(process.env.REACT_APP_SITE_URL);
      }
    } else {
      setError("Password doesn't match");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Please enter your new password</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formControlPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            {error && <h6 style={{ color: "red" }}>Password Doesn't match</h6>}
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
