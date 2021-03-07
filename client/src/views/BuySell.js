import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Buysell from "../components/BuySellForm";

const BuySell = () => {

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Buy Cryptocurrency</h3>
              </CardHeader>
              <CardBody>
                <Buysell />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BuySell;
