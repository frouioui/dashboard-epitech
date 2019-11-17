import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Allwidgets from './pages/Allwidget';
import Addwidget from './pages/Addwidget';
import CallbackOauth from './pages/CallbackOauth';
import Modifywidget from './pages/Modifywidget';
import 'bootstrap/dist/css/bootstrap.min.css';


import { AuthContext } from "./context/auth";

function App(props) {

  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/allwidget" component={Allwidgets} />
          <Route path="/addwidget" component={Addwidget} />
          <Route path="/admin" component={Admin} />
          <Route path="/modify/widget/:widget_id" component={Modifywidget} />
          <Route path="/auth/github" component={CallbackOauth} />

        </div>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;