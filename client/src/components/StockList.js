import React, {useContext} from 'react';
import { GlobalContext } from './ContextProvider';

const StockList = (props) => {

<<<<<<< HEAD
    const {loggedUser, focusCoin} = useContext(GlobalContext)
    const [loggedInUser, setLoggedInUser] = loggedUser;
=======
    const {loggedUser, focusCoin} = useContext(GlobalContext);
    //const [loggedInUser, setLoggedInUser] = loggedInUser;
<<<<<<< HEAD
>>>>>>> af1415ddb91ac26b9afe107639ced9e9fc79ac23
=======
<<<<<<< HEAD
    const {loggedUser, focusCoin} = useContext(GlobalContext)
    const [loggedInUser, setLoggedInUser] = loggedUser;
=======
>>>>>>> 1efb3652d88437311f768ddd6b505639e6c3d098
>>>>>>> b35f607e73edf3af3f163d895fa6d4a6aefbb2aa
    const [focusedCoin, setFocusedCoin] = focusCoin;

    return(
        <div>

        </div>
    )
}

export default StockList;