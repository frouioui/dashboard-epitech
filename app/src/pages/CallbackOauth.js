import React from "react";
import queryString from 'query-string';
import { Redirect } from 'react-router-dom'
import { codeOauthGitHub } from '../client/oauth';
import Cookies from 'universal-cookie';

class CallbackOauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      code: queryString.parse(this.props.location.search).code
    }
  }

  callCodeOauth() {
    console.log(this.state.code)
    codeOauthGitHub(this.state.code).then(res => {
      const cookies = new Cookies();
      cookies.set('user_id', res.data.id, { path: '/' });
      cookies.set('auth', res.data.auth, { path: '/' });
      this.setState({ redirect: true })
    }).catch((err) => setImmediate(() => {
      console.log(err)
    }))
  }

  renderRedirect = () => {
    if (this.state.redirect == true) {
      return <Redirect to='/allwidget' />
    }
  }

  render() {
    if (this.state.code == "" || this.state.code == null) {
      return (<h1>Error with oauth service</h1>)
    }
    if (this.state.redirect == false) {
      this.callCodeOauth()
    }
    if (this.state.redirect == true) {
      return <Redirect to='/allwidget' />
    }
    return (
      <p>Loading...</p>
    )
  }
}

export default CallbackOauth;