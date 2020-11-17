import React from 'react'
import {Form, Button} from 'react-bootstrap'
import "../styles/LeftSide.css";

export default function LeftSide() {
  return (
    <div>
      <Form className="leftSideForm">
        <Form.Group>
          <Form.Label>Enter your email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter your password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password"></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
