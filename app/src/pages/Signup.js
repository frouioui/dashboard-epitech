import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import "../CSS/html_properties_register.css";

import { Card, Form, Input, Button, Error } from '../components/AuthForm';
import axios from 'axios';
import { useAuth } from "../context/auth";
import Login from "./Login";

function Signup() {
  const [isRegisterIn, setRegisterIn]
    = useState(false);
<<<<<<< HEAD
  const [setIsErrorRegister2] = useState(false);
=======
>>>>>>> 89610650ce782cf2d4fe5009f0f37820b6544c75
  const [setIsErrorRegister] = useState(false);
  const [isMismatchPwd, setIsMismatchPwd] = useState(false);
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");
  useAuth();


  function postRegister() {
    var url = ""
<<<<<<< HEAD

    if (process.env.REACT_APP_DEV_ENV == "TRUE") {
      url = "http://localhost:9000/v1/users/new/"
    } else {
      url = "https://api.pedafy.com/v1/users/new/"
    }
    if (password !== passwordConfirm) {
      console.log("PASSWORDS MISMATCH")
      setIsMismatchPwd(true);
    } else if (email.indexOf("@") == 1) {
        console.log("ERROR INVALID MAIL")
    }
=======
    if (process.env.DEV_ENV === "TRUE") {
      url = "http://localhost:9000/v1/users/new/"
    } else {
      url = "https://api.pedafy.com/v1/users/new/"
    }
    if (password !== passwordConfirm) {
      console.log("PASSWORDS MISMATCH")
      setIsMismatchPwd(true);
    }
>>>>>>> 89610650ce782cf2d4fe5009f0f37820b6544c75
    else axios.post(url, {
      email: email,
      password: password
    }).then(result => {
      console.log(result)
      if (result.status === 200) {
        console.log("SUCCESS")
        setRegisterIn(true);
      } else {
        console.log("ERROR")
        setIsErrorRegister(true);
      }
    }).catch(e => {
      console.log(e)
      setIsErrorRegister(true)
<<<<<<< HEAD
      console.log(e)
      setIsErrorRegister2(true)
=======
>>>>>>> 89610650ce782cf2d4fe5009f0f37820b6544c75
    });
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