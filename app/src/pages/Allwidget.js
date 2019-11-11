import React from "react";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { getAllWidgetsOfOneUser, deleteOneWidget, deleteOneWidgetParam } from "../client/widgets";
import { getGPAAndCredits, getMarks, getNetsoul } from '../client/intra';
import { getHeadlines, getHeadlinesCountry, getNewsKeyword } from '../client/news'
import { getLastIssuePull, getLastIssueRepo } from '../client/github'

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

  fetchDataWidget(widget, allWidgets) {
    switch (widget.name) {
      case "GPA and Credits":
        getGPAAndCredits(widget.params).then(res2 => {
          widget.value = (
            <div>
              <h4>GPA: <b>{res2.data.data.gpa}</b></h4>
              <h4>Credits: <b>{res2.data.data.credits}</b></h4>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
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
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
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
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
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
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
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
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
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
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Repo last issue":
        getLastIssueRepo(widget.params, this.state.auth).then(res2 => {
          console.log(res2)
          widget.value = (
            <div>
              <h4> <b>#{res2.data.data.number}</b> -> {res2.data.data.name}</h4>
              <h6><a href={res2.data.data.url}>Go to issue.</a></h6>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Repo last PR":
        getLastIssuePull(widget.params, this.state.auth).then(res2 => {
          console.log(res2)
          widget.value = (
            <div>
              <h4> <b>#{res2.data.data.number}</b> -> {res2.data.data.name}</h4>
              <h6><a href={res2.data.data.url}>Go to PR.</a></h6>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      default:
        break;
    }

  }

  getAllWidgetsUser() {
    getAllWidgetsOfOneUser(this.state.user_id).then(res => {
      this.setState({
        userWidgets: res.data,
        userWidgetLoaded: true
      })
      res.data.forEach(widget => {
        this.fetchDataWidget(widget, res.data)
      });
    }).catch((err) => setImmediate(() => {
      console.error(err)
      this.setState({
        isError: true
      })
    }))
  }

  deleteWidget(widget) {
    var promises = [];
    widget.params.forEach(param => {
      promises.push(deleteOneWidgetParam(param.id));
    });
    Promise.all(promises).then(function (data) {
      deleteOneWidget(widget.id).then(res => {
        this.getAllWidgetsUser()
      }).catch(err => { console.error(err) })
    }).catch(function (err) {
      console.error(err)
    });
  }

  componentDidMount() {
    this.getAllWidgetsUser()
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
              <h3>{widget.loaded == true ? widget.value : "loading ..."}</h3>
              <button onClick={() => this.deleteWidget(widget)}>Delete</button>
              <button> <a href={"/modify/widget/" + widget.id}>Modify</a> </button>
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
      return <h5>An error occured, contact the maintainer of the website.</h5>
    } else if (this.state.userWidgetLoaded == false) {
      return <h5>Loading ...</h5>
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