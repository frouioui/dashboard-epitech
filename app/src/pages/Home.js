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
    <button><a href="/Addwidget">Add a widget</a></button>
        <h5>All widgets</h5>
  </div>
  <div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
  <div className="footer3">
  <h6>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h6>
  </div>
    </div>
  );
}

export default Home;

