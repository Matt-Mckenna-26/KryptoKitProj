import React, { useState, createContext} from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {

    // store all API and User information in state here

    const [userObj, setUserObj] = useState({}) // stores entire user object
    const [focusedCoin, setFocusedCoin] = useState({}) //stores info about current transacted coin

    return(
        <GlobalContext.Provider value={{loggedUser:[userObj, setUserObj], focusCoin:[focusedCoin, setFocusedCoin]}}>
            {props.children}
        </GlobalContext.Provider>
    )
    
}

