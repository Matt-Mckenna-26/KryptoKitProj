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
import { UserContext } from 'context/UserContext';

const BuySellForm = ({loggedUser, setLoggedUser}) => {
    const [ thisTransactionDollars, setThisTransactionDollars ] = useState(Number);
    const [ allCrypto, setAllCrypto ] = useState([]);
    const [ errs, setErrs ] = useState({});
    const [selectedCoin, setSelectedCoin] = useState(undefined);
    const [selectedCoinPortfolioId, setSelectedCoinPortfolioId] = useState(null)
    const history = useHistory();

    console.log(selectedCoin)
    
    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins")
            .then((res) =>{setAllCrypto(res.data)
            })
            .catch((err) => console.log(err));
    }, []);

    const getTotalWalletCoinValue = (newUser) => {
        let totalCoinValue = 0 
        let currentCoinPrices = {} 
        let queryParam = ''
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
                                {coinBalance : totalCoinValue,
                                dollarBalance : loggedUser.wallet[0].dollarBalance - thisTransactionDollars
                                }, {
                                    withCredentials: true
                                })
                                .then(res =>{console.log(res)
                                        setLoggedUser(res.data)
                                        history.push("/");
                                })
                                .catch(err => console.log(`error updating the user wallets coin value`, {err}))
                        })
                    .catch(err =>{console.log(`error fetching up to date prices`)
                                    console.log(queryParam)
                })
                setSelectedCoin(undefined)
                setThisTransactionDollars(0)
            }

    const submitFirstBuy = () => {
        console.log(loggedUser)
        axios.put(`http://localhost:8000/api/firstBuy/${loggedUser._id}`,
                            {coinName: selectedCoin.name,
                            coinId: selectedCoin.id,
                            avgCost: selectedCoin.market_data.current_price.usd,
                            userDollarsSpent: thisTransactionDollars,
                            numberOfCoins: thisTransactionDollars/selectedCoin.market_data.current_price.usd,
                            coinLogo : selectedCoin.image.small
                            },{
                            withCredentials: true
                            })
                                .then(res =>{console.log(res.data)
                                    getTotalWalletCoinValue(res.data)
                                })
                                .catch(err => console.log('Error Purchasing Coin', {err}))
    }

    const submitAddtlBuy = (addtlCoin) => {
            let addtlAmmountBought = thisTransactionDollars
            let numOfCoinsBought = (thisTransactionDollars /(selectedCoin.market_data.current_price.usd ))
                axios.put(`http://localhost:8000/api/buysell/${loggedUser._id}/${addtlCoin.coinId}`,
                        {userDollarsSpent: parseFloat(addtlCoin.userDollarsSpent) + parseFloat(addtlAmmountBought),
                        numberOfCoins: addtlCoin.numberOfCoins + numOfCoinsBought,
                        avgCost: (addtlCoin.numberOfCoins + numOfCoinsBought)/(addtlCoin.userDollarsSpent + thisTransactionDollars) }, {withCredentials:true})
                            .then(res => {
                                console.log(res)
                                getTotalWalletCoinValue(res.data)
                            })
                            .catch(err => console.log({err}))

        }

    const buyACoin = () => {
        let selectedCoinId = ''
        loggedUser.coinsPortfolio.map((coin, idx) => {
            selectedCoin.id === coin.coinId ? selectedCoinId = coin._id : console.log('not found')
        })
        console.log(selectedCoinId)
        axios.get(`http://localhost:8000/api/coinInfo/${loggedUser._id}/${selectedCoinId}`,
        {withCredentials: true})
            .then(res => {console.log(res)
                console.log(res.data)
                submitAddtlBuy(res.data)
            })
            .catch(err => {
                submitFirstBuy()
                console.log({err})
            })
    }



    return(
        <Container fluid>
        <Form role="form">
            <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative center" style={{width:"100%", margin:".5em 0 1em 0"}}>
            <Input 
                name="selectedCoinName"
                disabled={true}
                type="text"
                defaultValue ='Select a coin below to purchase'
                value = {selectedCoin !== undefined ? selectedCoin.name : 'Select a coin below to purchase'}
                />
            </InputGroup>
            <InputGroup className="input-group-alternative center" style={{width:"100%", margin:".5em 0 1em 0"}}>
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
                <Button className="ni ni-check-bold" color="primary" onClick = {(e) => buyACoin()}>
                Buy Coin
                </Button>
            </InputGroup>
            <InputGroup className="input-group-alternative center" style={{width:"100%", margin:".5em 0 1em 0"}}>
            <Label className = 'p-2'>Number of Coins</Label>
            <Input
                className ='p-2'
                name="numOfCoins"
                disabled={true}
                type="text"
                defaultValue = {0}
                value = {selectedCoin !== undefined ? thisTransactionDollars/selectedCoin.market_data.current_price.usd : 0}
                />
            </InputGroup>
                <div style={{ height:"420px",overflowY:"scroll"}}>
            {allCrypto.map((list, index) => (
                <Card className="singleCoin shadow-sm" style={{ display:"inline-grid", width: "12em", margin:".5em", minHeight:"250px" }} key={index}>
                    <CardHeader className="bg-transparent text-center" style={{maxHeight:"100px"}}>
                        <img src={list.image.small} />
                    </CardHeader>
                    <CardBody className="text-center">
                    <h4 for="list.name">{list.name}</h4>
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Current Price: ${(list.market_data.current_price.usd).toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <input
                            type="radio" 
                            onClick={(e) => setSelectedCoin(list)}
                            id={list.name}
                            name="coinSelect"
                            value={list.name}
                            className="form-check-input"
                            style={{ margin:"0.5em auto" }}
                        />
                    </CardBody>
                </Card>
                ))
            }
            </div>
            </FormGroup>
        </Form>
        </Container>
    )
}

export default BuySellForm;