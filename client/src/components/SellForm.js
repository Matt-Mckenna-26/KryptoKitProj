import React, {useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  Spinner,
} from "reactstrap";

import axios from 'axios';
import { set } from 'mongoose';

const SellForm = ({loggedUser, setLoggedUser}) => {
    const [ thisTransactionDollars, setThisTransactionDollars ] = useState(Number);
    const [ errs, setErrs ] = useState({});
    const [selectedCoin, setSelectedCoin] = useState(undefined);
    const [coinPricesObj, setCoinPricesObj] = useState(undefined);
    const [userLoaded, setUserLoaded] = useState(false);
    const history = useHistory();

    console.log(selectedCoin)

    const setWalletValueAfterSell = (newUser, method) => {
        let totalCoinValue = 0 
        let currentCoinPrices = {} 
        let queryParam = ''
        console.log(selectedCoin.numberOfCoins* coinPricesObj[selectedCoin.coinId].usd)
        newUser.coinsPortfolio.map((coin,idx) => {
            queryParam += `${coin.coinId}%2C`
        }) 
                axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
                    )
                    .then(res => {
                        currentCoinPrices = res.data
                        console.log(currentCoinPrices)
                            newUser.coinsPortfolio.map((coin, idx) => {
                                let coinValue = coin.numberOfCoins * currentCoinPrices[`${coin.coinId}`].usd
                                //store totalCoin Value in state to pass in req.body 
                                totalCoinValue += coinValue;
                                console.log(totalCoinValue);
                            })
                            axios.put(`http://localhost:8000/api/updateUserWallet/${newUser._id}/${newUser.wallet[0]._id}`,
                            //store totalCoinValue in state to pass in req.body to update user coinBalance 
                                {dollarBalance : (parseFloat(newUser.wallet[0].dollarBalance) + (method !== 'sellAll' ? parseFloat(thisTransactionDollars) : selectedCoin.numberOfCoins* coinPricesObj[selectedCoin.coinId].usd)),
                                    coinBalance : totalCoinValue,
                                }
                                ,{
                                    withCredentials: true
                                })
                                .then(res =>{console.log(res)
                                    setLoggedUser(res.data)
                                })
                                .catch(err => console.log(`error updating the user wallets coin value`, {err}))
                        })
                    .catch(err =>{console.log(`error fetching up to date prices`)
                                    console.log(queryParam)
                })
                setSelectedCoin(undefined)
                setThisTransactionDollars(0)
            }
// To sell all of a coin in the porfolio 
const sellAllOfACoin = (e) => {
            axios.put(`http://localhost:8000/api/sellAll/${loggedUser._id}`,
            {
                coinId:selectedCoin.coinId
            }, {withCredentials:true})
                        .then(res => {console.log(res.data)
                            setWalletValueAfterSell(res.data, 'sellAll')
                        })
                        .catch(err => console.log('Error Selling all of Coin'))
                        history.push("/");
}

//to sell ** some of a coin in portfolio**
    const sellCoin = (e) => {
        let amountSold = thisTransactionDollars
        let numOfCoinsSold = (thisTransactionDollars /((coinPricesObj[selectedCoin.coinId].usd)))
        axios.put(`http://localhost:8000/api/buysell/${loggedUser._id}/${selectedCoin.coinId}`, {
            userDollarsSpent: (selectedCoin.userDollarsSpent - amountSold),
            numberOfCoins: (selectedCoin.numberOfCoins - numOfCoinsSold),
            avgCost: ((selectedCoin.userDollarsSpent - amountSold)/(selectedCoin.numberOfCoins - numOfCoinsSold))
        },{
            withCredentials:true
        })
        .then((res) => {
            console.log(res.data)
            setWalletValueAfterSell(res.data, 'sellSome')
        })
        .catch((err) => console.log({err}));  
        history.push("/");
    }


//used to get an object with the real time price of each coin the user holds in portfolio
    const getCurrentCoinPrices = () => {
        let currentCoinPrices = {} 
        let queryParam = ''
        loggedUser.coinsPortfolio.map((coin,idx) => {
            queryParam += `${coin.coinId}%2C`
        }) 
                axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
                    )
                    .then(res => {
                        currentCoinPrices = res.data
                        setCoinPricesObj(res.data)
                        console.log('run')
                        })
                    .catch(err =>{console.log(`error fetching up to date prices`, {err})
                })
    }
//not the best way to do this but this conditional ensure we get current prices only on page initial load 
    if (loggedUser.username !== undefined && userLoaded === false) {
        getCurrentCoinPrices()
        setUserLoaded(true)
    }


    return(
        <Container fluid>
        <Form role="form">
            <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative center" style={{width:"400px", margin:".5em 0 1em 0"}}>
            <Input 
                name="selectedCoinName"
                disabled={true}
                type="text"
                defaultValue ='Select a coin below to purchase'
                value = {selectedCoin !== undefined ? selectedCoin.coinName : 'Select a coin below to sell'}
                />
            </InputGroup>
            <InputGroup className="input-group-alternative center" style={{width:"400px", margin:".5em 0 1em 0"}}>
                <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                </InputGroupText>
                </InputGroupAddon>
                <Input
                name="amountToSpend"
                placeholder="USD Currency (min $100)"
                type="text"
                autoComplete="new-amount"
                value = {thisTransactionDollars}
                onChange={ (e) => setThisTransactionDollars(e.target.value)}
                />
                <Button className="ni ni-check-bold" color="primary" onClick={(e) => sellCoin()}>
                Sell Coin
                </Button>
            </InputGroup>
            <InputGroup className="input-group-alternative center" style={{width:"400px", margin:".5em 0 1em 0"}}>
            <Label className = 'p-2'>Number of Coins</Label>
            <Input
                className ='p-2'
                name="numOfCoins"
                disabled={true}
                type="text"
                defaultValue = {0}
                value = {selectedCoin !== undefined ? (thisTransactionDollars/(coinPricesObj[selectedCoin.coinId].usd)): 0}
                />
            </InputGroup>
            {selectedCoin !== undefined ?
            <>
            <InputGroup className="input-group-alternative center" style={{width:"400px", margin:".5em 0 1em 0"}}>
            <Label className = 'p-2'>Total Balance (USD)</Label>
            <Input
                className ='p-2'
                name="Total Balance"
                disabled={true}
                type="text"
                defaultValue = {0}
                value = {selectedCoin.numberOfCoins* coinPricesObj[selectedCoin.coinId].usd}
                />
            </InputGroup>
            <InputGroup className="input-group-alternative center" style={{width:"400px", margin:".5em 0 1em 0"}}>
                <Button className="ni ni-check-bold mx-auto" color="danger" onClick={(e) => sellAllOfACoin()}>
                Sell All of your {selectedCoin.coinName}.
                </Button>
            </InputGroup>
            </>: null}
            {coinPricesObj !== undefined ? 
            <div style={{ height:"420px",overflowY:"scroll"}}>
            {loggedUser.coinsPortfolio.map((coin, idx) => (
                <Card className="singleCoin shadow-sm" style={{ display:"inline-grid", width: "12em", margin:".5em", minHeight:"250px" }} key={idx}>
                    <CardHeader className="bg-transparent text-center" style={{maxHeight:"100px"}}>
                        <img src={coin.coinLogo} />
                    </CardHeader>
                    <CardBody className="text-center">
                    <h4 for="list.name">{coin.coinName}</h4>
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Coins Owned: {coin.numberOfCoins}</p>
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Current Value(Usd): {(coin.numberOfCoins* coinPricesObj[coin.coinId].usd).toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Avg Cost: ${coin.avgCost}</p>
                        <input
                            type="radio" 
                            onClick={(e) => setSelectedCoin(coin)}
                            id={coin.coinName}
                            name="coinSelect"
                            value={coin.coinName}
                            className="form-check-input"
                            style={{ margin:"0.5em auto" }}
                        />
                    </CardBody>
                </Card>
            ))}
            </div>
            : <Spinner/>}
            </FormGroup>
        </Form>
        </Container>
    )
}

export default SellForm;