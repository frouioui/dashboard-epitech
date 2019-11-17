import React from "react";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { getAllWidgetsOfOneUser, deleteOneWidget, deleteOneWidgetParam } from "../client/widgets";
import { getGPAAndCredits, getMarks, getNetsoul } from '../client/intra';
import { getHeadlines, getHeadlinesCountry, getNewsKeyword } from '../client/news'
import { getLastIssuePull, getLastIssueRepo } from '../client/github'
import { getCurrency, getCurrencyTranslation } from '../client/currency'

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
          if (res2.data.data.gpa > 2) {
            widget.value = (
              <div>
                <h4>Congratulations! Nice job</h4>
                <h4>GPA:</h4> <h2><b>{res2.data.data.gpa}</b></h2>
                <h4>Credits:</h4><h2><b>{res2.data.data.credits}</b></h2>
              </div>
            )
          } else {
            widget.value = (
              <div>
                <h4>Come one! A small effort</h4>
                <h4>GPA:</h4> <h2><b>{res2.data.data.gpa}</b></h2>
                <h4>Credits:</h4><h2><b>{res2.data.data.credits}</b></h2>
              </div>
            )
          }
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Marks":
        getMarks(widget.params).then(res2 => {
          widget.value = (
            <div>
              {res2.data.data.map(e => (
                <div>
                  <h4>{e.title}</h4>
                  <h5>Mark: <b>{e.note}</b><br></br><br></br> <a href={e.title_link}>see more</a> </h5>
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
          if (res2.data.data > 50)
            widget.value = (
              <div class="LogValid">
                <h4>Great !</h4><h2>{res2.data.data}</h2><h5><b>hours</b> this week!</h5>
              </div>
            )
          else {
            widget.value = (
              <div className="LogErrors">
                <h4>Isn't enought...</h4>
                <h2>{res2.data.data}</h2><h5><b>hours</b> this week!</h5>
              </div>
            )
          }
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Search news":
        getNewsKeyword(widget.params).then(res2 => {
          widget.value = (
            <div>
              <hr />
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
          widget.value = (
            <div>
              <h4>{res2.data.data.title}</h4>
              <h6>{res2.data.data.author ? res2.data.data.author : "no author"}</h6>
              <h5><a href={res2.data.data.url}>Learn more!</a></h5>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Headlines country":
        getHeadlinesCountry(widget.params).then(res2 => {
          widget.value = (
            <div>
              <h4>{res2.data.data.title}</h4>
              <h6>{res2.data.data.author ? res2.data.data.author : "no author"}</h6>
              <h5><a href={res2.data.data.url}>Learn more!</a></h5>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Repo last issue":
        getLastIssueRepo(widget.params, this.state.auth).then(res2 => {
          widget.value = (
            <div>
              <h4> <b>#{res2.data.data.number}</b> -> {res2.data.data.name}</h4>
              <h5><a href={res2.data.data.url}>Go to issue.</a></h5>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Repo last PR":
        getLastIssuePull(widget.params, this.state.auth).then(res2 => {
          widget.value = (
            <div>
              <h4> <b>#{res2.data.data.number}</b> -> {res2.data.data.name}</h4>
              <h5><a href={res2.data.data.url}>Go to PR.</a></h5>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Exchange rate currency":
        console.log(widget.params)
        getCurrency(widget.params).then(res2 => {
          var from = Object.keys(res2.data.data.rates)[0]
          widget.value = (
            <div>
              <h4>{res2.data.data.base} = {res2.data.data.rates[from]} {from}</h4>
            </div>
          )
          widget.loaded = true
          this.setState({ userWidgets: allWidgets })
        }).catch((err) => setImmediate(() => { console.error(err) }))
        break;

      case "Calculate money to currency":
        console.log(widget.params)
        getCurrencyTranslation(widget.params).then(res2 => {
          widget.value = (
            <div>
              <h4>{res2.data.data.from_amount} {res2.data.data.from} = {res2.data.data.amount} {res2.data.data.to}</h4>
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
    var user = this.state.user_id
    getAllWidgetsOfOneUser(user).then(res => {
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

  deleteWidget = (widget) => {

    var promises = [];
    widget.params.forEach(param => {
      promises.push(deleteOneWidgetParam(param.id));
    });
    Promise.all(promises).then(data => {
      deleteOneWidget(this.state.user_id, widget.id).then(res => {
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
        <div className="header_allW">
        </div>
      </div>
    )
  }

  footer() {
    return (
      <div>
        <div className="footer12">
        </div>
        <div className="production">
          <h5>A production of Julien Ferrier & Florent Poinsard © Epitech Toulouse, Copyright, All rights reserved.</h5>
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
              <h5>{widget.name}</h5>
              <h6>{widget.description}</h6>
              <hr />
              <h3>{widget.loaded === true ? widget.value : "loading ..."}</h3>
              <br></br>
              <button onClick={this.deleteWidget.bind(this, widget)}>Delete</button>
              <div className="modify_widget">
                <button><a href={"/modify/widget/" + widget.id}>Modify</a></button>
              </div>
              <div>
                {setInterval(() => {
                  this.fetchDataWidget(widget, this.state.userWidgets)
                }, widget.timer * 60 * 1000)}
              </div>
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

    if (this.state.isError === true) {
      return <h5>An error occured, contact the maintainer of the website.</h5>
    } else if (this.state.userWidgetLoaded === false) {
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
        {this.footer()}
      </div>

    );
  }
}

export default Allwidgets;