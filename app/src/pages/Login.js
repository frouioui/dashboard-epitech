import React, { useState } from "react";
//
import "../CSS/html_properties_login.css";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button, Error } from '../components/AuthForm';

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function postLogin() {
    let url = "http://localhost:9000/v1/users/login/"
    axios.post(url, {
      email: email,
      password: password
    }).then(result => {
      console.log(result)
      if (result.status === 200) {
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      console.log(e)
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
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
        { isError &&<Error>The username or password provided were incorrect!</Error> }
      <div class="footer">
        <h6>A production of Julien Ferrier © Epitech Toulouse, Copyright, All rights reserved.</h6>
      </div>
    </Card>
  );
}

export default Login;