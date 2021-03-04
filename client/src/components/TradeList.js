import React, {useContext} from 'react';
import {GlobalContext} from './ContextProvider';

const TradeList = () => {
    const {loggedUser, focusCoin} = useContext(GlobalContext);
    const [loggedInUser] = loggedUser;

    // what info are we storing in this component

    return(
        <div>
            <h2>TradeList Component</h2>

        </div>
    )
}

export default TradeList;