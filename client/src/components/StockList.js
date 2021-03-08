import React, {useContext} from 'react';
import { GlobalContext } from './ContextProvider';

const StockList = (props) => {

    const {loggedUser, focusCoin} = useContext(GlobalContext);
    //const [loggedInUser, setLoggedInUser] = loggedInUser;
    const [focusedCoin, setFocusedCoin] = focusCoin;

    return(
        <div>

        </div>
    )
}

export default StockList;