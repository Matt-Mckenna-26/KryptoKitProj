import React from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';


const Nav = () => {
    const logout = () => {
        axios 
          .post(
            "http://localhost:8000/api/logout",
            {},
            {
              withCredentials: true
            }
          )
          .then(res => {
            console.log(res);
          })
          .catch(console.log);
          navigate("/");
      };

    return(
        <div>
            <h3>Main Navbar</h3>
            <button onClick={logout} >Logout</button>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/wallet">Crypto Wallet</Link>
            <Link to="/buysell">Buy/Sell</Link>
        </div>
    )
}

export default Nav;