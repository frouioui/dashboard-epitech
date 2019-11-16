import React from "react";
import smartphone from "../img/smart.png";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

import "../CSS/home.css"

class Allwidgets extends React.Component {

  header() {
    return (
      <div>
        <div className="header0">
        </div>
        <a href="/login" class="button1">Register</a>
        <div className="titre">
          <p>P</p>
          <p>e</p>
          <p>d</p>
          <p>a</p>
          <p>f</p>
          <p>y</p>
          <p>.</p>
        </div>
        <div className="mytitre">
       <h1>The best Dashboard you've seen.</h1>
       </div>
      </div>
    )
  }

  footer() {
    return (
      <div>
        <div className="footer03">
        </div>
        <div className="produ">
            <h5>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h5>
          </div>
      </div>
    )
  }




  render() {
   

    return (
      <div>
        {this.header()}
        <div className="body_container">
          <form method="get" action="/signup">
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div class="container-widget">
        </div>
        <img src={smartphone}></img>
        {this.footer()}
      </div>

    );
  }
}

export default Allwidgets;

