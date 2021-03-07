import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { 
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
 } from 'reactstrap';
//import '../scss/Components/Coin.scss';

const Coin = ({coins}) => {
  //console.log(coins)
  return (
    <div style={{ margin:"0", padding:"0"}}>
      {/* Page content */}
      <Table
        className="align-items-center"
        responsive hover
      >
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Coin</th>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">24h</th>
            <th scope="col">Mkt Cap</th>
          </tr>
        </thead>
        <tbody>
            {coins.map((coin, i) => <tr className={`coin-container ${(i + 2) % 2 === 0 ? "even" : "odd"}`} key={coin.name}>
              <td>{coin.market_cap_rank}.</td>
              <td>
                <Link to={`/admin/coin/${coin.id}`}>
                  <Media className="align-items-center"><img src={coin.image} alt={coin.id} style={{width:"32px"}} /></Media>
                </Link>
              </td>
              <td><Link to={`/admin/coin/${coin.id}`}>{coin.id}</Link></td>
              <td>
              <Link to={`/admin/coin/${coin.id}`}>
                {coin.symbol.toUpperCase()}
              </Link>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td><span className={coin.price_change_percentage_24h === null ? 'black' : coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0}%</span></td>
              <td>Mkt Cap: ${coin.market_cap.toLocaleString()}</td>
            </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default Coin;