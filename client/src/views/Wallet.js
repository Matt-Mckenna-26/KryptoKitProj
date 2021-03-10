/*!
=========================================================
* KryptoKit - v1.0.0
=========================================================
* Custom Code by CodingDojo Group Project Dev Team
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {GlobalContext} from './ContextProvider';
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { UserContext } from "context/UserContext";
import RedirectToLogin from "components/RedirectToLogin";
import Login from "./Login";
import {navigate} from '@reach/router';


const Wallet = () => {
    const {loggedUser, setLoggedUser} = useContext(UserContext);
    const [userLoaded, setUserLoaded] = useState(false);
    const [coinPricesObj, setCoinPricesObj] = useState(undefined)


    const getCurrentCoinPrices = () => {
      let currentCoinPrices = {} 
      let queryParam = ''
      loggedUser.coinsPortfolio.map((coin,idx) => {
          queryParam += `${coin.coinId}%2C`
      }) 
              axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`)
                  .then(res => {
                      currentCoinPrices = res.data
                      setCoinPricesObj(res.data)
                      console.log('run')
                      })
                  .catch(err =>{console.log('error fetching up to date prices', {err})
              })
    }
  
    if (loggedUser.username !== undefined && userLoaded === false) {
        getCurrentCoinPrices()
        setUserLoaded(true)
    }
    
  return (
    loggedUser.username !== undefined ?
    (<>
      <Header />
      {/* Page content */}
      {coinPricesObj !== undefined ? 

      <Row style={{padding:"10px"}}>

      {loggedUser.coinsPortfolio.map((coin, idx)=>(
         <div className="col-3 mt-3 mb-4">
         <Card className="shadow mb-4" style={{borderRadius:"15px"}}>
           <CardHeader className="bg-transparent" >
             <h3 className="mb-0">{coin.coinName}<img src={coin.coinLogo} className="ml-4" style={{height:"40px"}} alt=""/></h3>
              
           </CardHeader>
           <CardBody style={{paddingTop:"0px"}}>
             <Row className="icon-examples">
             
      
      <p className="text-uppercase text-muted mb-0"><b>Balance (USD):</b> <span style={{color:"black"}}><b>  ${coin.userDollarsSpent}</b></span></p>
      <p className="text-uppercase text-muted mb-2"><b>Current Value:</b>
      <span style={{
        color: coin.userDollarsSpent > (coin.numberOfCoins * coinPricesObj[coin.coinId].usd).toLocaleString(undefined, {minimumFractionDigits:2}) ? "red" : "green"}}><b> ${(coin.numberOfCoins * coinPricesObj[coin.coinId].usd).toLocaleString(undefined, {minimumFractionDigits:2})}</b></span></p>
      <Button>Buy More</Button>
      <Button>Sell</Button>
             </Row>
           </CardBody>
         </Card>
       </div>
    ))}
    </Row>
    : null}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
         
          {/* <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Ethereum</h3>
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
          </div> */}
          {/* <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Ripple</h3>
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
          </div> */}
          {/* <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Litecoin</h3>
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
          </div> */}
        </Row>
        <Row className="mt-3">
          {/* <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">NEO</h3>
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
          </div> */}
          {/* <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Monero</h3>
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
          </div> */}
        </Row>
      </Container>
    </>): <Login/>

    // <RedirectToLogin/>
  );
};

export default Wallet;