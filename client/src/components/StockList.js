import React, {useContext} from 'react';
import { GlobalContext } from './ContextProvider';

const StockList = (props) => {

<<<<<<< HEAD
    const {loggedUser, focusCoin} = useContext(GlobalContext);
    //const [loggedInUser, setLoggedInUser] = loggedInUser;
=======
    const {loggedUser, focusCoin} = useContext(GlobalContext)
    const [loggedInUser, setLoggedInUser] = loggedUser;
>>>>>>> 33cc9956f69cb22cc9f3fce1329fd1f427090232
    const [focusedCoin, setFocusedCoin] = focusCoin;

    return(
        <div>

        </div>
    )
}

export default StockList;