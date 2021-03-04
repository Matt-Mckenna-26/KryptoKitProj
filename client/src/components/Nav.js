import React from 'react';
import {Link} from '@reach/router';


const Nav = () => {

    return(
        <div>
            <h3>Main Navbar</h3>
            <Link>Dashboard</Link>
            <Link>Crypto Wallet</Link>
            <Link>Buy/Sell</Link>
        </div>
    )
}

export default Nav;