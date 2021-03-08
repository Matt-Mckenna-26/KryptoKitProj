/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import { useHistory } from 'react-router';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleRegister = () => {
    alert("You are now registered!\nPlease login.")
    history.push("/auth/login");
  }

  const handleAlert = (e) => {
    e.preventDefault();
    alert("Sign in option coming soon!");
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-4">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                onClick={ handleAlert }
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                onClick={ handleAlert }
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-3">
            <div className="text-center text-muted mb-4">
              <small>Sign in with Credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Name"
                    label="Name" 
                    type="text"
                    margin="normal"
                    autoComplete="new-name" 
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    label="Email Address"
                    placeholder="Email"
                    margin="normal"
                    name="email"
                    type="email"
                    autoComplete="new-email" 
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    label="Password" 
                    type="password"
                    margin="normal"
                    autoComplete="new-password" 
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-1" color="primary" type="button" onClick={handleRegister}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
