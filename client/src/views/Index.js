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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { UserContext } from "context/UserContext";
import RedirectToLogin from "components/RedirectToLogin";
import axios from 'axios';
import Login from "./Login";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [coinPricesObj, setCoinPricesObj] = useState({})
  const {loggedUser, setLoggedUser} = useContext(UserContext);

  // const getTotalWalletCoinValue = () => {
  //   let totalCoinValue = 0 
  //   let currentCoinPrices = {} 
  //   let queryParam = ''
  //   loggedUser.coinsPortfolio.map((coin,idx) => {
  //       queryParam += `${coin.coinId}%2C`
  //   }) 
  //           axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${queryParam}&vs_currencies=usd`,
  //               )
  //               .then(res => {
  //                   currentCoinPrices = res.data
  //                   setCoinPricesObj(res.data)
  //                   console.log(currentCoinPrices)
  //                       loggedUser.coinsPortfolio.map((coin, idx) => {
  //                           let coinValue = coin.numberOfCoins * currentCoinPrices[`${coin.coinId}`].usd
  //                           //store totalCoin Value in state to pass in req.body 
  //                           totalCoinValue += coinValue;
  //                           console.log(totalCoinValue);
  //                       })
  //                       axios.put(`http://localhost:8000/api/updateUserWallet/${loggedUser._id}/${loggedUser.wallet[0]._id}`,
  //                       //store totalCoinValue in state to pass in req.body to update user coinBalance 
  //                           {coinBalance : totalCoinValue,
  //                           dollarBalance : loggedUser.wallet[0].dollarBalance
  //                           }, {
  //                               withCredentials: true
  //                           })
  //                           .then(res =>{console.log(res)
  //                                   setLoggedUser(res.data)
  //                           })
  //                           .catch(err => console.log(`error updating the user wallets coin value`, {err}))
  //                   })
  //               .catch(err =>{console.log(`error fetching up to date prices`, {err})
  //                               console.log(queryParam)
  //           })
  //       }

  //   useEffect(() => getTotalWalletCoinValue(), [])

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    loggedUser.username !== undefined  ? 
      (
      <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Account value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total exhanges</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Portfolio</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Crypto</th>
                    <th scope="col">Amount Purchased</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {loggedUser.coinsPortfolio.map((coin, idx) => (
                    <tr>
                    <th scope="row">{coin.coinName}</th>
                    <td>{coin.numberOfCoins}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            // value={((coinPricesObj[coin.coinId].usd)/(loggedUser.wallet[0].coinValue))*100}
                            barClassName="bg-gradient-primary"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))
                  }       
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>): <RedirectToLogin/>
  );
};

export default Index;
