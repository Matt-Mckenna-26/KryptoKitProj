import React from 'react';
import {Link} from '@reach/router';


const Nav = () => {

    return(
        <div>
            <h3>Main Navbar</h3>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/wallet">Crypto Wallet</Link>
            <Link to="/buysell">Buy/Sell</Link>
        </div>
    )
}

export default Nav;