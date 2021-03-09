import React, { useState , useContext} from "react";
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
import { UserContext } from "context/UserContext";
import RedirectToLogin from "components/RedirectToLogin";

const SellView = () => {
  const {loggedUser} = useContext(UserContext)

  return (
    loggedUser.username !== undefined ? 
    (<>
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
    </>) : <RedirectToLogin/>
  );
};

export default SellView;