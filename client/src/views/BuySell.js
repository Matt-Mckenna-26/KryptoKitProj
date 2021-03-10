import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
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
import { UserContext } from "context/UserContext";
import RedirectToLogin from "components/RedirectToLogin";
import Login from "./Login";

const BuySell = () => {
  const {loggedUser, setLoggedUser} = useContext(UserContext)
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
                <h3 className="mb-0">Buy Cryptocurrency</h3>
              </CardHeader>
              <CardBody>
                <Buysell loggedUser = {loggedUser} setLoggedUser={setLoggedUser}/>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>) : <Login/>

    // <RedirectToLogin/>
  );
};

export default BuySell;
