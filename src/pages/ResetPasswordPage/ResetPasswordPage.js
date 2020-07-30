import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

import { confirmEmail } from "../../api";

export default function () {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await confirmEmail(email);
    if (resp.emailFound) {
      console.log("Found email!");
    } else {
      console.log("Not found~!");
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Reset password</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onChange}
              />
              <Form.Text className="text-muted">
                Please enter your email
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
