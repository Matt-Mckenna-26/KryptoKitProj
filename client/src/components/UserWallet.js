import React, {useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

const UserWallet = () => {
    const {loggedUser} = useContext(UserContext);
    const [updatedPrice, setUpdatedPrice] = useState({})

    const getTotalWalletCoinValue = () => {
        let totalCoinValue = 0 
        let currentCoinPrices = {} 
        let queryParam = ''
        loggedUser.coinsPortfolio.map((coin,idx) => {
            queryParam += `${coin.coinId}%2C`
        }) 
                axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
                    )
                    .then(res => {
                        currentCoinPrices = res.data
                        console.log(currentCoinPrices)
                        setUpdatedPrice(currentCoinPrices)
                        }).catch(err=>console.log(err));
                    }

    return(
        <div>
        
            <h1>Wallet Component</h1>
             {loggedUser.coinsPortfolio.map((coin, idx)=>(
                  <div className="col-3">
                  <Card className="shadow">
                    <CardHeader className="bg-transparent">
                      <h3 className="mb-0">{coin.coinName}</h3>
                      <p>{updatedPrice[coin.coinId].usd}</p>
                    </CardHeader>
                    <CardBody>
                      <Row className="icon-examples">
                        <Col lg="3" md="6">
                        </Col>
                        <Col lg="3" md="6">
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
                <div>
                    <h3>{coin.name}</h3>
                    <p>{updatedPrice[coin.coinId].usd}</p>

                    <p>{coin.numberOfCoins}</p>
                    <p>{coin.userDollarsSpent}</p>
                </div>
            ))}
        </div>
    )
}

export default UserWallet;