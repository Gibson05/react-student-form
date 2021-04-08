import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";
import App from "./components/App";
import Login from "./components/login";

export default function Main() {
    return (
      <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
      </Router>
    );
  }