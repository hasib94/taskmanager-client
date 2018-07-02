import React, { Component } from "react";
import "./App.css";
import LoginForm from "./Pages/Auth/LoginForm";
import DashBoard from "./Pages/Dashboard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/auth/:type" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={DashBoard} />
          <Route
            exact
            path="/"
            render={() => <Redirect to="/dashboard/all" />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
