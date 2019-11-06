import React, { useState } from "react";
import "../CSS/html_properties_login.css";
import { Link, Redirect } from "react-router-dom";
import { Card, Form, Input, Button, Error } from '../components/AuthForm';
import { loginUser } from '../client/users'

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function postLogin() {
    loginUser(email, password).then(res => {
      setLoggedIn(true);
    }).catch((err) => setImmediate(() => {
      setIsError(true);
    }))
  }

  if (isLoggedIn) {
    return <Redirect to="/allwidget" />;
  }

  return (
    <Card>
      <Form>
        <h1 className="registerTitle2">Signin</h1>
        <div>
          <p>P</p>
          <p>e</p>
          <p>d</p>
          <p>a</p>
          <p>f</p>
          <p>y</p>
          <p>.</p>
        </div>

        <Input
          type="email"
          value={email}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <div className="linked_2">
        <Link to="/signup">Don't have an account?</Link>
      </div>
      {isError && <Error>The username or password provided were incorrect!</Error>}
      <div className="footer2">
        <h6>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h6>
      </div>
    </Card>
  );
}

export default Login;