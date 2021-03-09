/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useContext} from "react";
import { useHistory } from 'react-router';
import axios from 'axios';

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
import { Link } from "react-router-dom";
import {navigate} from "@reach/router";
import { UserContext } from "context/UserContext";
// import { ContextProvider } from "../context/ContextProvider";
// import { GlobalContext } from "../context/ContextProvider";

async function loginUser(credentials) {
 return fetch('http://localhost:8000/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();
  const {loggedUser, setLoggedUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = loginUser({
      email,
      password
    });
    setToken(token);
    axios
        .post(
            "http://localhost:8000/api/login",
            { email, password },
            {
                withCredentials: true
            }
        )
        .then(res => {
            console.log(res);
            axios.get("http://localhost:8000/api/users/loggedin", {
                    withCredentials: true
                    })
                    .then(res => {
                        console.log(res);
                        setLoggedUser(res.data)
                    })
                    .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err);
            console.log("hello");
            navigate("/auth/register");
            window.location.reload(false);
        });
    history.push("/");
    console.log(loggedUser)
  }

  const handleAlert = (e) => {
    e.preventDefault();
    alert("Function coming soon!");
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
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
          </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with Credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    label="Email Address"
                    margin="normal"
                    name="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
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
                    label="Password" 
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    margin="normal"
                    autoComplete="new-password" 
                    required
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  {/* <span className="text-muted">Remember me</span> */
                /* </label>
              </div> */}
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleSubmit}> {/*() => history.push('/') */}
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link to="./login"
              className="text-light"
              onClick={ handleAlert }
            >
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="./register"
              className="text-light"
            >
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
