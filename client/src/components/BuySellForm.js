import React, {useContext, useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';

const BuySellForm = () => {
    const [ userDollarsSpent, setUserDollarsSpent ] = useState("");
    const [ allCrypto, setAllCrypto ] = useState([]);
    const [ errs, setErrs ] = useState({});
    
    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins")
            .then((res) => setAllCrypto(res.data))
            .catch((err) => console.log(err));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/buysell", {
            userDollarsSpent: userDollarsSpent,
        })
        .then((res) => {
            if(res.data.errors) {
                setErrs(res.data.errors);
                console.log(res.data.errors);
            } else {
                console.log(res.data._id);
                navigate(`/buysell/${res.data._id}`);
            }
        })
        .catch((err) => console.log(err));  
    }
// need to remove all style before production. style is just for viewable model
    return(
        <div>
            <h3>Choose Crypto</h3>
            <h3>Funds</h3>
            <form>
                <div className="coinArray" style={{width:"340px", height:"400px", overflowY:"scroll",}}>
                {
                allCrypto.map((list, index) => (
                    <div className="singleCoin" style={{display:"inline-block", margin:"20px 30px", width:"100px", height:"110px", outline:"1px solid black", paddingBottom:"20px"}} key={index}>
                        <input
                            type="radio" 
                            id={list.name}
                            name="coinSelect"
                            value={list.name}
                            style={{display:"block", marginLeft:"auto", marginBottom:"5px"}}
                        />
                        <img style={{display:"block", margin:"0 auto"}} src={list.image.small} />
                        <h6 style={{width:"100px", margin:"5px 0px"}} for="list.name">{list.name}</h6>
                        <p style={{fontSize:"10px", margin:"5px 0px"}}>Current Price: ${(list.market_data.current_price.usd).toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                    </div>
                ))
                }
                </div>
                <input
                    type="text"
                    name="amountToSpend"
                    placeholder="USD Currency (min $100)"
                    onChange={ (e) => setUserDollarsSpent(e.target.value)}
                    />
                <button type="submit">Buy Coin</button>
            </form>
        </div>
    )
}

export default BuySellForm;