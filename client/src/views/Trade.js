/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useContext } from "react";
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

const Trade = () => {
  const [trade, setTrade] = useState();
  //const {loggedUser, focusCoin} = useContext(GlobalContext);
  //const [loggedInUser] = loggedUser;

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Trading</h3>
              </CardHeader>
              <CardBody>

              </CardBody>
              </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Trade;
