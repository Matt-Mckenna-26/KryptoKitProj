/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { helpers } from "chart.js";
import { UserContext } from "context/UserContext";
import React, {useContext} from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const RedirectToLogin = () => {
  const {loggedUser} = useContext(UserContext)
  
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" style={{height:"850px", marginBottom:"-2em"}}>
        <Container fluid>
            <div className="header-body">
            {/* Card stats */}
            <Row>
                <Col lg="12" xl="12" className="text-center">
                <h1 className='text-white'>
                Please Login Or Create an Account To Access the Full Features of KryptoKit!
                </h1>
                <img 
                  alt="face" 
                  width="500" 
                  className="animated rollIn"
                  style={{margin:"4rem auto", textAlign:"center"}}
                  src={
                    require("../assets/img/theme/lock-unlock.png")
                      .default
                  }
                />
                </Col>
            </Row>
            </div>
        </Container>
    </div>
    )
}

export default RedirectToLogin;