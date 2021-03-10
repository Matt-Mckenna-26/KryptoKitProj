import React, {useContext, useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
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
} from "reactstrap";

import axios from 'axios';
import { UserContext } from 'context/UserContext';

const SellForm = ({loggedUser, setLoggedUser}) => {
    const [ userDollarsSpent, setUserDollarsSpent ] = useState("");
    const [ errs, setErrs ] = useState({});
    const [selectedCoin, setSelectedCoin] = useState(undefined);

    console.log(selectedCoin)
    
    const submitForm = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/buysell", {
            userDollarsSpent: userDollarsSpent,
            numberOfCoins: (userDollarsSpent/(selectedCoin.market_data.current_price.usd)),
            avgCost: ((userDollarsSpent/(selectedCoin.market_data.current_price.usd))/userDollarsSpent)
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

    const getCoinPortfolioData = (coinName) => {
            ///api/coinInfo/:userId/:coinName
            axios.get(`http://localhost:8000/api/coinInfo/${loggedUser._id}/${coinName}`)
                .then(res => console.log(res.data))
                .catch(err => console.log({err}))
    }
    
    
    // const getCoinsCurrentValue = () => {
    //     loggedUser.coinsPortfolio.map((coin,idx) => {
    //         queryParam += `${coin.coinName.replace(/\s+/g, '')}%2C`
    //     }) 
    //             axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
    //                 )
    //                 .then(res => {
    //                     currentCoinPrices = res.data
    //                     console.log(currentCoinPrices)
    //                         loggedUser.coinsPortfolio.map((coin, idx) => {
    //                             let coinValue = coin.numberOfCoins * currentCoinPrices[`${coin.coinName.replace(/\s+/g, '')}`].usd
    //                             //store totalCoin Value in state to pass in req.body 
    //                             totalCoinValue += coinValue;
    //                             console.log(totalCoinValue);
    //                         })
    //                 }

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
                
                onChange={ (e) => setUserDollarsSpent(e.target.value)}
                />
                <Button className="ni ni-check-bold" color="primary" type="submit">
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
                // value = {selectedCoin !== undefined ? userDollarsSpent/selectedCoin.market_data.current_price.usd : 0}
                />
            </InputGroup>
            <div style={{ height:"420px",overflowY:"scroll"}}>
            {
                //instead of mapping through all coins it will only map through the coins currently in the users portfolio
            loggedUser.coinsPortfolio.map((coin, idx) => (
                <Card className="singleCoin shadow-sm" style={{ display:"inline-grid", width: "12em", margin:".5em", minHeight:"250px" }} key={idx}>
                    <CardHeader className="bg-transparent text-center" style={{maxHeight:"100px"}}>
                        <img src={coin.coinLogo} />
                    </CardHeader>
                    <CardBody className="text-center">
                    <h4 for="list.name">{coin.coinName}</h4>
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Coins Owned: {coin.numberOfCoins}</p>
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
            ))
            }
            </div>
            </FormGroup>
        </Form>
        </Container>
    )
}

export default SellForm;