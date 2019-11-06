import React, { Component } from "react";
import App from '../App';
import AddWidget from "./Addwidget";
import "../CSS/html_properties_widgets_header.css"
import axios from 'axios';
import { useAuth } from "../context/auth";

/*http://localhost:9001/v1/widgets/services/*/
 
class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            'items': [],
            isLoaded: false,
        }
    }
    

    componentDidMount() {
        fetch('http://localhost:9001/v1/widgets/services/')
        .then(res => res.json())
        .then(json => {
                this.setState ({
                    isLoaded: true,
                    items: json, 
                })
        });
    }

    render() {
        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading ...</div>;
        }
        else {
        
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
        <div className="header_widgets">
            <h6>Widget name</h6>
            <h6>Name</h6>
        </div>
        <div className="block">
             <div className="first">
                {items.data.map(item => (
                   <h3>{item.name}</h3> 
                ))}
                <input type="radio" checked="checked" name="radio"></input>
                <span class="checkmark"></span>
                        <hr />
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
        <div className="footer3">
        </div>
    </div>
        );
    }
}
}
  
export default Test;