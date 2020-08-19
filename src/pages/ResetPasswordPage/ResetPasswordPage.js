import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

import { confirmEmail } from "../../api";

export default function () {
  const [email, setEmail] = useState("");
  const [prompt, setPrompt] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await confirmEmail(email);
    if (resp.emailFound) {
      setPrompt('Please check your email to reset your password.')
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
                onChange={onChange}
                placeholder="Enter email"
              />
            </Form.Group>
            {prompt && (<div className="my-1">
              {prompt}
            </div>)}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
