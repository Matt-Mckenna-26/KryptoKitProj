import React from 'react';
import {Link} from 'react-router-dom';
import { 
  Media,
  Table,
 } from 'reactstrap';

const TrendingCoin = ({trendingCoins}) => {
  return (
    <div style={{ margin:"0", padding:"0"}}>
      {/* Page content */}
      <Table
        className="align-items-center"
        responsive hover
      >
        <thead className="thead-light">
          <tr> 
            <th scope="col">Coin Name</th>
            <th scope="col"></th>
            <th scope="col">Symbol</th>
            <th scope="col">Mkt Cap Rank</th>
          </tr>
        </thead>
        <tbody>
            {trendingCoins.map((coin, i) => <tr className={`coin-container ${(i + 2) % 2 === 0 ? "even" : "odd"}`} key={coin.item.name}>
                <td>{coin.item.name}.</td>
                <td>
                    <Media className="align-items-center"><img src={coin.item.thumb} alt={coin.item.id} style={{width:"32px"}} /></Media>
                </td>
                <td>
                    {coin.item.symbol}
                </td>
                <td>Mkt Cap Rank: {coin.item.market_cap_rank}</td>
            </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default TrendingCoin;