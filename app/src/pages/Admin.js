import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  const cookies = new Cookies();
  let user_id = cookies.get('user_id')
  if (!user_id || user_id === "") {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;