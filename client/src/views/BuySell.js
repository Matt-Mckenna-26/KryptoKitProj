/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Buysell = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const toggle1 = () => setDropdownOpen1(prevState => !prevState);
  const toggle2 = () => setDropdownOpen2(prevState => !prevState);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Buy Cryptocurrency</h3>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                      <DropdownToggle caret>
                        Select the Crypto Currency
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Bitcoin</DropdownItem>
                        <DropdownItem>Ethereum</DropdownItem>
                        <DropdownItem>Ripple</DropdownItem>
                        <DropdownItem>Litecoin</DropdownItem>
                        <DropdownItem>Neo</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Amount"
                        type="text"
                        autoComplete="new-amount"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button">
                      Buy Cryptocurrency
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
          <div className="col-6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Sell Cryptocurrency</h3>
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                      <DropdownToggle caret>
                        Select the Crypto Currency
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Bitcoin</DropdownItem>
                        <DropdownItem>Ethereum</DropdownItem>
                        <DropdownItem>Ripple</DropdownItem>
                        <DropdownItem>Litecoin</DropdownItem>
                        <DropdownItem>Neo</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Amount"
                        type="text"
                        autoComplete="new-amount"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button">
                      Sell Cryptocurrency
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Buysell;
