import React, {useState} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Allwidget from './pages/Allwidget';
import Addwidget from './pages/Addwidget';
import Test from './pages/Test';
import 'bootstrap/dist/css/bootstrap.min.css';


import { AuthContext } from "./context/auth";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/allwidget" component={Allwidget} />
          <Route path="/addwidget" component={Addwidget} />
          <Route path="/admin" component={Admin} />
          <Route path="/test" component={Test} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;