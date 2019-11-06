import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import "../CSS/html_properties_register.css";

import { Card, Form, Input, Button, Error } from '../components/AuthForm';
import { useAuth } from "../context/auth";
import Login from "./Login";
import { createUser } from '../client/users'

function Signup() {
  const [isRegisterIn, setRegisterIn] = useState(false);
  const [setIsErrorRegister] = useState(false);
  const [isMismatchPwd, setIsMismatchPwd] = useState(false);
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");
  useAuth();


  function postRegister() {
    if (password !== passwordConfirm) {
      setIsMismatchPwd(true);
      return
    }
    createUser(email, password).then(res => {
      setRegisterIn(true)
    }).catch((err) => setImmediate(() => {
      setIsErrorRegister(true)
    }))
  }

  if (isRegisterIn) {
    return <Redirect to="/login" />
  }

  return (
    <Card>
      <Form>
        <h1 className="registerTitle">Register on</h1>
        <div>
          <p>P</p>
          <p>e</p>
          <p>d</p>
          <p>a</p>
          <p>f</p>
          <p>y</p>
          <p>.</p>
        </div>
        <Input type="Adresse mail"
          value={email}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="Mail address"
        />
        <Input type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <Input type="password"
          value={passwordConfirm}
          onChange={e => {
            setPasswordconfirm(e.target.value);
          }}
          placeholder="Confirm your password"
        />
        <Button onClick={postRegister}>Sign Up</Button>
      </Form>
      <div className="linked">
        <Link to="/login">Already have an account?</Link>
      </div>
      {isMismatchPwd && <Error>Oups! The passwords seem to be different.</Error>}
      <div className="footer2">
        <h6>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h6>
      </div>
    </Card>
  );
}


export default Signup;