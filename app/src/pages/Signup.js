import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Card, Form, Input, Button, Error } from '../components/AuthForm';
import axios from  'axios';
import { useAuth } from "../context/auth";

function Signup() {
  const [isRegisterIn, setRegisterIn]
  = useState(false);
  const [setIsErrorRegister] = useState(false);
  const [isMismatchPwd, setIsMismatchPwd] = useState(false);
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");
  useAuth();


function postRegister() {
  let url = "http://localhost:9000/v1/users/new"
  if (password !== passwordConfirm ) {
    console.log("PASSWORDS MISMATCH")
    setIsMismatchPwd(true);
  }
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
    });
  }

if (isRegisterIn) {
  return <Redirect to="/login" />
}

    return (
      <Card>
        <Form>
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
        <Link to="/login">Already have an account?</Link>
        { isMismatchPwd &&<Error>Oups! The passwords seem to be different.</Error> }
      </Card>
    );
  }


export default Signup;