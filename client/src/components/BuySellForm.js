import React, {useContext, useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import { GlobalContext } from './ContextProvider';
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

const BuySellForm = (props) => {
    const [ userDollarsSpent, setUserDollarsSpent ] = useState("");
    const [ allCrypto, setAllCrypto ] = useState([]);
    const [ errs, setErrs ] = useState({});
    const [selectedCoin, setSelectedCoin] = useState(undefined);
    
    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins")
            .then((res) =>{setAllCrypto(res.data)
            })
            .catch((err) => console.log(err));
    }, []);

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
                value = {selectedCoin !== undefined ? selectedCoin.name : 'Select a coin below to purchase'}
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
                Buy Coin
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
                value = {selectedCoin !== undefined ? userDollarsSpent/selectedCoin.market_data.current_price.usd : 0}
                />
            </InputGroup>
            <div style={{ height:"420px",overflowY:"scroll"}}>
            {
            allCrypto.map((list, index) => (
                <Card className="singleCoin shadow-sm" style={{ display:"inline-grid", width: "12em", margin:".5em" }} key={index}>
                    <CardHeader className="bg-transparent text-center">
                        <img src={list.image.small} />
                    </CardHeader>
                    <CardBody className="text-center">
                    <h4 for="list.name">{list.name}</h4>
<<<<<<< HEAD
                        <p style={{fontSize:"12px", margin:"5px 0px"}}>Current Price: ${(list.market_data.current_price.usd).toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <input
                            type="radio" 
=======
                        <p style={{fontSize:"15px", margin:"5px 0px"}}>Current Price: ${(list.market_data.current_price.usd).toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <input
                            type="radio" 
                            onClick={(e) => setSelectedCoin(list)}
>>>>>>> af1415ddb91ac26b9afe107639ced9e9fc79ac23
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