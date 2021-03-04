import React from 'react';
import StockList from '../components/StockList';
import Graph from '../components/Graph';
import UserWallet from '../components/UserWallet';

const Dashboard = () => {

    return(
        <div>
            <StockList />
            <Graph />
            <UserWallet />  
        </div>
    )
}

export default Dashboard