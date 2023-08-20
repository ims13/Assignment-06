import { Card, Form, Alert, Button } from "react-bootstrap";
import React from 'react';

import { useState } from "react";

import { useRouter } from "next/router";

import { registerUser } from "../lib/authenticate";


export default function Register(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
  
    // Check for empty fields
    if (!user.trim() || !password.trim() || !password2.trim()) {
      setWarning("All fields are required.");
      return;
    }
  
    // Check if user is in an email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(user)) {
      setWarning("Please enter a valid email address.");
      return;
    }
  
    // Check if passwords have a minimum length and complexity
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setWarning("Password should be at least 8 characters, contain at least one letter and one number.");
      return;
    }
  
    // Check if passwords match
    if (password !== password2) {
      setWarning("Passwords do not match.");
      return;
    }
  
    // Attempt registration
    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      // Handle registration errors here
      if (err.code === 11000) {
        setWarning("The provided email address is already associated with an existing account. Please use another email.");
      } else {
        setWarning("There was an unexpected error registering the user. Please try again.");
      }
    }
}

  

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control 
           type="text"
           value={user} 
           id="userName" 
           name="userName" 
           onChange={(e) => setUser(e.target.value)
           }/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
          type="password" 
          value={password} 
          id="password" 
          name="password" 
          onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
              type="password" 
              value={password2} 
              id="password2"  // <-- Changed this ID
              name="password2"  //
              onChange={(e) => setPassword2(e.target.value)}
            />
        </Form.Group>
        {/* "Alert" Component and conditionally showing the warning message */}
        {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
        <br />
        <Button variant="primary" type="submit"> 
           Register
         </Button>
      </Form>
    </>
  );
}