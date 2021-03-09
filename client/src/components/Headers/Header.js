/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import { helpers } from "chart.js";
//import RedirectToLogin from "components/RedirectToLogin";
import { UserContext } from "context/UserContext";
import React, {useContext, useEffect} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios'

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const {loggedUser, setLoggedUser} = useContext(UserContext)

  const getTotalWalletCoinValue = () => {
    let totalCoinValue = 0 
    let currentCoinPrices = {} 
    let queryParam = ''
    loggedUser.coinsPortfolio.map((coin,idx) => {
        queryParam += `${coin.coinName.replace(/\s+/g, '')}%2C`
    }) 
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
                )
                .then(res => {
                    currentCoinPrices = res.data
                    console.log(currentCoinPrices)
                        loggedUser.coinsPortfolio.map((coin, idx) => {
                            let coinValue = coin.numberOfCoins * currentCoinPrices[`${coin.coinName.replace(/\s+/g, '')}`].usd
                            //store totalCoin Value in state to pass in req.body 
                            totalCoinValue += coinValue;
                            console.log(totalCoinValue);
                        })
                        axios.put(`http://localhost:8000/api/updateUserWallet/${loggedUser._id}/${loggedUser.wallet[0]._id}`,
                        //store totalCoinValue in state to pass in req.body to update user coinBalance 
                            {coinBalance : totalCoinValue,
                            dollarBalance : loggedUser.wallet[0].dollarBalance
                            }, {
                                withCredentials: true
                            })
                            .then(res =>{console.log(res)
                                    setLoggedUser(res.data)
                            })
                            .catch(err => console.log(`error updating the user wallets coin value`, {err}))
                    })
                .catch(err =>{console.log(`error fetching up to date prices`, {err})
                                console.log(queryParam)
            })
        }

  useEffect(() => getTotalWalletCoinValue(), [setLoggedUser])

  return (
    <>
    {loggedUser.username === undefined ? <Redirect from="/" to="/auth/login" />  : 
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Dollar Balance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        ${Math.round(100*(loggedUser.wallet[0].dollarBalance))/100}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Coin Balance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">${Math.round(100*(loggedUser.wallet[0].coinBalance))/100}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Account % Change
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Math.round(100*(5000-(loggedUser.wallet[0].dollarBalance + loggedUser.wallet[0].coinBalance))/5000)/100}%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Unique Cryptos Owned
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {loggedUser.coinsPortfolio.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12.23%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
}
    </>
  );
};

export default Header;
