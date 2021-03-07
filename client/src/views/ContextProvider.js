import React, { useState, useEffect, createContext} from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {

    // store all API and User information in state here
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/users/loggedin')
        .then((res)=>{
            console.log(res.body)
            setUserObj(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    // this is to access the focusCoin --incomplete

    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api/coin/:coinName')
    //     .then((res)=>{
    //         console.log(res.body)
    //         setUserObj(res.data)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // },[])

    const [userObj, setUserObj] = useState({}) // stores entire user object
    const [focusedCoin, setFocusedCoin] = useState({}) //stores info about current transacted coin

    return(
        <GlobalContext.Provider value={{loggedUser:[userObj, setUserObj], focusCoin:[focusedCoin, setFocusedCoin]}}>
            {props.children}
        </GlobalContext.Provider>
    )
 
}
