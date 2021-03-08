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
import SellForm from "../components/SellForm";

const SellView = () => {

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
                <h3 className="mb-0">Sell Cryptocurrency ( below options will map through user portfolio instead of all coins)</h3>
              </CardHeader>
              <CardBody>
                <SellForm />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SellView;