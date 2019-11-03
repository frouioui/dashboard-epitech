import React from "react";
import { useAuth } from "../context/auth";

import "../CSS/html_properties_widgets_header.css"

function Home(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
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
    <button>Add a widget</button>
  </div>
  <div className="footer3">
  </div>
    </div>
  );
}

export default Home;

