/*!
=========================================================
* KryptoKit - v1.0.0
=========================================================
* Custom Code by CodingDojo Group Project Dev Team
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {GlobalContext} from './ContextProvider';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { UserContext } from "context/UserContext";
import RedirectToLogin from "components/RedirectToLogin";


const Wallet = () => {
    const {loggedUser} = useContext(UserContext);

  return (
    loggedUser.username !== undefined ?
    (<>
      <Header />
      {/* Page content */}
      {/* {loggedInUser.coinsPortfolio.map((coin, idx)=>(
        <div>
            <h3>{coin.name}</h3>
            
            <p>{coin.numberOfCoins}</p>
            <p>{coin.userDollarsSpent}</p>
        </div>
    ))} */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Bitcoin</h3>
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
          <div className="col-3">
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
          </div>
          <div className="col-3">
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
          </div>
          <div className="col-3">
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
          </div>
        </Row>
        <Row className="mt-3">
          <div className="col-3">
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
          </div>
          <div className="col-3">
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
          </div>
        </Row>
      </Container>
    </>): <Redirect from="/" to="/auth/login" />

    // <RedirectToLogin/>
  );
};

export default Wallet;