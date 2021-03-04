import React, {} from 'react';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import BuySell from './views/BuySell';
import Dashboard from './views/Dashboard';
import Wallet from './views/Wallet';
import {Router} from '@reach/router';
import {ContextProvider} from './components/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <div className="App">
          <Header />
          <Nav />
          <Router>
            <BuySell path="" />
            <Dashboard path="" />
            <Wallet path="" />
          </Router>
    
      </div>
    </ContextProvider>
  );
}

export default App;
