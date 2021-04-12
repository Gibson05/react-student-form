import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";
import App from "./components/App";
import Login from "./components/login";
import Profile from "./components/profile.js"

export default function Main() {
    return (
      <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
      </Router>
    );
  }