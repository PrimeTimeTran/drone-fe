import React from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

export default function() {
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Reset password</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
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
