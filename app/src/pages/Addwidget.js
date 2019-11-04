import React from "react";
import { Button } from "../components/AuthForm";
import "../CSS/html_properties_widgets_header.css"

function Addwidget(props) {
  
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
            <h3>Add a widget</h3>
            <hr class="separator"/>
        </div>

        <div className="body2">
            <form method="get" action="/allwidget">
                <button type="submit">Cancel</button>
            </form>
        </div>

    <div className="allWidgets">
            <div className="header_widgets">
            <h6>Widget name</h6>
            <h6>Name</h6>
        </div>



        <div className="block">
             <div className="first">
                <h3>Météo</h3>
                <h3>Température</h3>
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
            </div>

            <div className="second">
                <h3>Météo</h3>
                <h3>Wind speed</h3>
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
            </div>

            <div className="third">
                <h3>Cinéma</h3>
                <h3>Next movie</h3>
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
            </div>

            <div className="five">
                <h3>Bourse</h3>
                <h3>NASDAQ</h3>
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
            </div>

            <div className="five">
                <h3>Epitech</h3>
                <h3>GPA</h3>
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
            </div>

            <div className="five">
                <h3>Epitech</h3>
                <h3>Nombre de crédits</h3>
                <input type="radio" checked="checked" name="radio"></input>
            <span class="checkmark"></span>
            </div>
        </div>

        <div className="manage_widget">
            <h3>Configure your widget</h3>
                <div className="bloc">
                </div>

                <div className="submit">
                    <button>Submit</button>
                </div>
        </div>

    </div>

        <div className="footer3">
        </div>

 </div>
  );
}

export default Addwidget;