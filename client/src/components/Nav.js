import React from 'react';
<<<<<<< HEAD
import { Link } from '@reach/router';
=======
import {Link, navigate} from '@reach/router';
import axios from 'axios';
>>>>>>> 33cc9956f69cb22cc9f3fce1329fd1f427090232


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
<<<<<<< HEAD
=======
            <button onClick={logout} >Logout</button>
>>>>>>> 33cc9956f69cb22cc9f3fce1329fd1f427090232
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/wallet">Crypto Wallet</Link>
            <Link to="/buysell">Buy/Sell</Link>
        </div>
    )
}

export default Nav;