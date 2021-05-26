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

import { TicketContainer } from './components/ticket-list-container.component';

import moment from 'moment';
moment().format();

export default function App() {
  const history = useHistory();
  window.appHistory = history;

  if (window.sessionStorage.getItem("token") == null) {
    console.log("no token");
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
            <Route path="/" exact component={TicketContainer} />
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