import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import "../CSS/html_properties_register.css";

import { Card, Form, Input, Button, Error } from '../components/SignForm';
import { useAuth } from "../context/auth";
import { createUser, getAllUsers } from '../client/users'


function Signup() {
  const [isRegisterIn, setRegisterIn] = useState(false);
  const [setIsErrorRegister] = useState(false);
  const [isUsernameExists, setUsernameExists] = useState(false);
  const [isMismatchPwd, setIsMismatchPwd] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");
  useAuth();

  function postRegister() {
    if (password !== passwordConfirm) {
      setIsMismatchPwd(true);
      return
    }
    if (isUsernameExists) {
      return
    }
    createUser(username, password).then(res => {
      setRegisterIn(true)
    }).catch((err) => setImmediate(() => {
      setIsErrorRegister(true)
    }))
  }

  function checkUsernameExists(e) {
    var same = false;
    getAllUsers().then(res => {
      res.data.data.map(user => {
        if ((e === user.login) === true) {
          same = true;
          return
        }
      })
      if (same === true) {
        setUsernameExists(true)
        return true
      } else {
        setUsernameExists(false)
        return false
      }
    }).catch((err) => setImmediate(() => {
      console.error(err)
      return false
    }))
  }

  if (isRegisterIn) {
    return <Redirect to="/login" />
  }


  return (
    <Card>
      <Form>
      <div>
        <div className="header4">
        </div>
        <div className="titre">
          <p>S</p>
          <p>i</p>
          <p>g</p>
          <p>n</p>
          <p>i</p>
          <p>n</p>
          <p>.</p>
        </div>
      </div>
        <Input type="Username"
          value={username}
          onChange={e => {
            setUserName(e.target.value);
            checkUsernameExists(e.target.value);
          }}
          placeholder="Username"
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
      <div>
        {isUsernameExists && <Error>This username already exists.</Error>}
      </div>
      <div>
        {isMismatchPwd && <Error>Oups! The passwords seem to be different.</Error>}
      </div>

      <div className="linked">
        <Link to="/login">Already have an account?</Link>
      </div>
      <div className="footer0">
      </div>
      <div className="prod">
        <h6>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h6>
      </div>
    </Card>
  );
}


export default Signup;