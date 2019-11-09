import React from "react";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { getAllWidgetsOfOneUser } from "../client/widgets";

import "../CSS/allwidgets.css"

class Allwidgets extends React.Component {
  constructor(props) {
    super(props);

    var cookies = new Cookies()

    this.state = {
      userWidgets: [],
      userWidgetLoaded: false,
      user_id: cookies.get('user_id'),
      auth: cookies.get('auth'),
      isError: false
    }
  }

  componentDidMount() {
    getAllWidgetsOfOneUser(this.state.user_id).then(res => {
      this.setState({
        userWidgets: res.data,
        userWidgetLoaded: true
      })
    }).catch((err) => setImmediate(() => {
      console.error(err)
      this.setState({
        isError: true
      })
    }))
  }

  header() {
    return (
      <div>
        <div className="header">
          <button>Pedafy</button>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Setting</button>
          <div class="dropdown-content">
            <a href="#">Add Widget</a>
            <a href="#">Logout</a>
            <a href="#">Use our API</a>
          </div>
        </div>
      </div>
    )
  }

  displayWidgets() {
    return (
      <div>
        {this.state.userWidgets.map(widget => (
          <div class="column">
            <div class="widgetsbox">
              <h6>{widget.id}</h6>
            </div>
          </div>
        ))}
        {this.state.userWidgets.map(widget => (
          <div class="column">
            <div class="widgetsbox">
              <h6>{widget.id}</h6>
            </div>
          </div>
        ))
        }
      </div>
    )
  }

  render() {
    if (!this.state.user_id || this.state.user_id === "") {
      return <Redirect to='/login' />
    }

    if (this.state.isError == true) {
      return <p>An error occured, contact the maintainer of the website.</p>
    } else if (this.state.userWidgetLoaded == false) {
      return <p>Loading ...</p>
    }

    return (
      <div>
        {this.header()}
        <div className="body container">
          <form method="get" action="/addwidget">
            <button type="submit">Add a widget</button>
          </form>
        </div>
        <div class="container-widget">
          {this.displayWidgets()}
          {this.displayWidgets()}
          {this.displayWidgets()}
          {this.displayWidgets()}
        </div>
      </div>

    );
  }
}

export default Allwidgets;