import React, {useContext} from 'react';
import { GlobalContext } from './ContextProvider';

const StockList = (props) => {

<<<<<<< HEAD
    const {loggedUser, focusCoin} = useContext(GlobalContext)
    const [loggedInUser, setLoggedInUser] = loggedUser;
=======
    const {loggedUser, focusCoin} = useContext(GlobalContext);
    //const [loggedInUser, setLoggedInUser] = loggedInUser;
>>>>>>> af1415ddb91ac26b9afe107639ced9e9fc79ac23
    const [focusedCoin, setFocusedCoin] = focusCoin;

    return(
        <div>

        </div>
    )
}

export default StockList;