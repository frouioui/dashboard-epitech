import React from "react";
import { useAuth } from "../context/auth";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

import "../CSS/html_properties_widgets_header.css"

function Home(props) {
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
      <div className="header">
        <button>Pedafy</button>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Setting</button>
        <div class="dropdown-content">
          <a href="https://pedafy.com/signup">Add Widget</a>
          <a href="https://pedafy.com/signup">Logout</a>
          <a href="#">Use our API</a>
        </div>
      </div>
      <div className="body">
        <form method="get" action="/addwidget">
          <button type="submit">Add a widget</button>
        </form>
      </div>
      <div className="body3">
        <form method="get" action="/modify/widget/2">
          <button type="submit">Modify a widget</button>
        </form>
      </div>
      <div className="footer4">
      </div>
    </div>
  );
}

export default Home;