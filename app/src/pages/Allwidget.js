import React from "react";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { getAllWidgetsOfOneUser } from "../client/widgets";
import { getGPAAndCredits, getMarks, getNetsoul } from '../client/intra';
import { getHeadlines, getHeadlinesCountry, getNewsKeyword } from '../client/news'

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
      res.data.forEach(widget => {
        switch (widget.name) {
          case "GPA and Credits":
            getGPAAndCredits(widget.params).then(res2 => {
              widget.value = (
                <div>
                  <h4>GPA: <b>{res2.data.data.gpa}</b></h4>
                  <h4>Credits: <b>{res2.data.data.credits}</b></h4>
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          case "Marks":
            getMarks(widget.params).then(res2 => {
              console.log(res2)
              widget.value = (
                <div>
                  {res2.data.data.map(e => (
                    <div>
                      <h4>{e.title}</h4>
                      <h5>Mark: <b>{e.note}</b> <a href={e.title_link}>see more</a> </h5>
                    </div>
                  ))}
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          case "Logtime":
            getNetsoul(widget.params).then(res2 => {
              console.log(res2)
              widget.value = (
                <div>
                  <h4>{res2.data.data} hours this week!</h4>
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          case "Search news":
            getNewsKeyword(widget.params).then(res2 => {
              console.log(res2)
              widget.value = (
                <div>
                  <h4>{res2.data.data.title}</h4>
                  <h6>{res2.data.data.author ? res2.data.data.author : "no author"}</h6>
                  <h6><a href={res2.data.data.url}>Learn more!</a></h6>
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          case "Headlines news":
            getHeadlines(widget.params).then(res2 => {
              console.log(res2)
              widget.value = (
                <div>
                  <h4>{res2.data.data.title}</h4>
                  <h6>{res2.data.data.author ? res2.data.data.author : "no author"}</h6>
                  <h6><a href={res2.data.data.url}>Learn more!</a></h6>
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          case "Headlines country":
            getHeadlinesCountry(widget.params).then(res2 => {
              console.log(res2)
              widget.value = (
                <div>
                  <h4>{res2.data.data.title}</h4>
                  <h6>{res2.data.data.author ? res2.data.data.author : "no author"}</h6>
                  <h6><a href={res2.data.data.url}>Learn more!</a></h6>
                </div>
              )
              this.setState({ userWidgets: res.data })
            }).catch((err) => setImmediate(() => { console.error(err) }))
            break;

          default:
            break;
        }
      });
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
              <h6>{widget.name}</h6>
              <h6>{widget.description}</h6>
              <h3>{widget.value}</h3>
            </div>
          </div>
        ))}
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
        </div>
      </div>

    );
  }
}

export default Allwidgets;