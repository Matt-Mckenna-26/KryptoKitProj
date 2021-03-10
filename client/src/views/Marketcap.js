/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef, useEffect, useState, useContext } from "react";
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Coin from '../components/Coin';
import { UserContext } from "context/UserContext";

function Marketcap()  {
  const [coins, setCoins] = useState([]);
  const {loggedUser, setLoggedUser} = useContext(UserContext)
  const pageRef = useRef(1);

  const getApi = async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${pageRef.current}&sparkline=true`);
    setCoins(result.data);
  }

  useEffect(() => {
    const interval = setInterval( () => getApi(), 1000 );
    return () => clearInterval(interval);
  },[pageRef])

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
                <h3 className="mb-0">Marketcap</h3>
              </CardHeader>
              <CardBody>
                {
                  coins[0] === undefined ? (
                    <Spinner color="primary" />
                  ) : (
                    <div>
                      <Coin coins={coins} />
                      <Pagination size="lg" aria-label="Page navigation">
                        <PaginationItem style={{ marginLeft:"40%", width:"50%", marginTop: ".5em" }}>
                          <PaginationLink previous onClick={() => {pageRef.current === 1 ? pageRef.current = 1 : pageRef.current -= 1}}>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem style={{ marginRight:"30%", width:"50%", marginTop: ".5em" }}>
                          <PaginationLink next onClick={() => pageRef.current += 1}>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>                        
                    </div>
                  )
                }
              </CardBody>
              </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Marketcap;
