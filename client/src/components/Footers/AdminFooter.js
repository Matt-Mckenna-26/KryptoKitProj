/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://github.com/Matt-Mckenna-26/KryptoKitProj/?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              KryptoKit
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            {/* <NavItem>
              <NavLink
                href="https://www.codingdojo.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                CodingDojo
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink
                href="https://github.com/Matt-Mckenna-26/KryptoKitProj/?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://github.com/Matt-Mckenna-26/KryptoKitProj/blob/master/LICENSE?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                MIT License
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
