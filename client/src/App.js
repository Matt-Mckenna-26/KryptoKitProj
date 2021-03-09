import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/kryptokit-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import {UserContext} from './context/UserContext'

function App() {
  const [loggedUser, setLoggedUser] = useState({});

  const external_link="https://reactrouter.com/web/guides/quick-start";
  return (
    <UserContext.Provider value = {{loggedUser, setLoggedUser}}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
