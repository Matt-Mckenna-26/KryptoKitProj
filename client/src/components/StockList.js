import React, {useContext} from 'react';
import { GlobalContext } from './ContextProvider';

const StockList = (props) => {

    const {loggedUser, focusCoin} = useContext(GlobalContext);
    //const [loggedInUser, setLoggedInUser] = loggedInUser;
<<<<<<< HEAD
    const {loggedUser, focusCoin} = useContext(GlobalContext)
    const [loggedInUser, setLoggedInUser] = loggedUser;
=======
>>>>>>> 1efb3652d88437311f768ddd6b505639e6c3d098
    const [focusedCoin, setFocusedCoin] = focusCoin;

    return(
        <div>

        </div>
    )
}

export default StockList;