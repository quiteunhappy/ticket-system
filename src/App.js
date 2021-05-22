//set HTTPS=true&&npm start
import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import components
import LogIn from "./components/log-in.component";
import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";
import ManageUsers from "./components/manage-users.component";
import ManageProjects from "./components/manage-projects.component";
import EditTicket from "./components/edit-ticket.component";
import axios from 'axios';

export default function App() {
  const history = useHistory();
  window.appHistory = history;
  const VerifyToken = (params) => {
    console.log(params);
    axios.post('https://localhost:44328/VerifyLogin', "\"" + params + "\"", {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response) {
        console.log(response.data);
        window.sessionStorage.removeItem("token");
        return false;
      }
    });
    return true;
  }
  if (window.sessionStorage.getItem("token") == null) {
    console.log("no token");
    return (
      <LogIn />
    )
  }
  else {
    if (!VerifyToken(window.sessionStorage.getItem("token"))) {
      console.log("bad token");
      return (
        <LogIn />
      )
    }
    else {
      return (
        <Router>
          <Navbar />
          <div className="wrapper">
            <Sidebar />
            <div id="content">
              <Route path="/" exact component={Dashboard} />
              <Route path="/tickets/create" component={CreateTicket} />
              <Route path="/manage-users" component={ManageUsers} />
              <Route path="/users/create" component={CreateUser} />
              <Route path="/manage-projects" component={ManageProjects} />
              <Route path="/edit/:id" component={EditTicket} />
            </div>
          </div>
        </Router>
      );
    }
  }
}