import React from 'react';
import './App.css';
import LogReg from "./views/LogReg";
import LoginForm from "./views/LoginForm";
import Nav from './components/Nav';
import Header from './components/Header';
import BuySell from './views/BuySell';
import Dashboard from './views/Dashboard';
import Wallet from './views/Wallet';
import { Router } from '@reach/router';
import { ContextProvider } from './components/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <div className="App">
          <Header />
          <Nav />
          <Router>
<<<<<<< HEAD
            <BuySell path="/buysell" />
            <Dashboard path="/dashboard" />
=======
            <LogReg path="/"/>
            <LoginForm path="/login"/> 
            <BuySell path="/buysell" />
            <Dashboard path="/dashboard"/>
>>>>>>> 33cc9956f69cb22cc9f3fce1329fd1f427090232
            <Wallet path="/wallet" />
          </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
