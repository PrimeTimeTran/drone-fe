import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

export default function (props) {

  console.log({props}, props.match.params.token)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
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
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
