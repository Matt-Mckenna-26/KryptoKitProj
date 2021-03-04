import React, {useContext} from 'react';
import {GlobalContext} from './ContextProvider';

const UserWallet = () => {
    const {loggedUser, focusCoin} = useContext(GlobalContext);
    const [loggedInUser] = loggedUser;

    return(
        <div>
            <h1>Wallet Component</h1>
             {/* {loggedInUser.coinsPortfolio.map((coin, idx)=>(
                <div>
                    <h3>{coin.name}</h3>
                    
                    <p>{coin.numberOfCoins}</p>
                    <p>{coin.userDollarsSpent}</p>
                </div>
            ))} */}

        </div>
    )
}

export default UserWallet;