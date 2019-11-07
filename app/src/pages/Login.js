import React, { useState } from "react";
import "../CSS/html_properties_login.css";
import { Link, Redirect } from "react-router-dom";
import { Card, Form, Input, Button, Error } from '../components/AuthForm';
import { loginUser } from '../client/users'
import { getAuthorizeGitHub } from '../client/oauth'
import Cookies from 'universal-cookie';

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function postLogin() {
    loginUser(username, password).then(res => {
      const cookies = new Cookies();
      cookies.set('user_id', res.data.id, { path: '/' });
      cookies.set('auth', 'none', { path: '/' });
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
          type="username"
          value={username}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="Username"
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
      <div className="linked_3">
        <a href={getAuthorizeGitHub()}>Login with GitHub</a>
      </div>
      {isError && <Error>The username or password provided were incorrect!</Error>}
      <div className="footer2">
        <h6>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h6>
      </div>
    </Card>
  );
}

export default Login;