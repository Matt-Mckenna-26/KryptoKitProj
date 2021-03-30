/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios'
import Header from '../components/Headers/Header'
import TrendingCoin from '../components/TrendingCoin'
import { UserContext } from "context/UserContext";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import Login from "./Login";
// core components


const Trending = () => {
  const [trendingCoins, setTrendingCoins] = useState([])
  const {loggedUser, setLoggedUser} = useContext(UserContext)

  useEffect(() => {
    axios
        .get("https://api.coingecko.com/api/v3/search/trending")
          .then((res) =>{setTrendingCoins(res.data.coins)
                          console.log(res.data.coins)})
          .catch((err) => console.log(err));
}, []);


  return (
    <>
    {loggedUser.username !== undefined ? 
    (
    <>
    <Header/>
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Trending Now</h3>
                <h5>Most searched for Crypto Currencies within past 24 hours</h5>
              </CardHeader>
              <CardBody>
                {
                  trendingCoins[0] === undefined ? (
                    <Spinner color="primary" />
                  ) : (
                    <div>
                      <TrendingCoin trendingCoins = {trendingCoins} />
                      <Pagination size="lg" aria-label="Page navigation">
                        <PaginationItem style={{ marginLeft:"40%", width:"50%", marginTop: ".5em" }}>
                        </PaginationItem>
                        <PaginationItem style={{ marginRight:"30%", width:"50%", marginTop: ".5em" }}>
                        </PaginationItem>
                      </Pagination>                        
                    </div>
                  )}
              </CardBody>
              </Card>
          </div>
        </Row>
      </Container>
      </>): <Login/>}
    </>
  );
};

export default Trending;
