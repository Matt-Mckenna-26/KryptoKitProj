import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import Details from "../components/Details";
import {useDarkMode} from "./useDarkMode"
import {useLocalStorage} from "./useLocalStorage"
import { useHistory } from "react-router-dom";

//import '../scss/Routes/Coin.scss';

const Coin = ({match}) => {
  const history = useHistory();
  const {params:{coin}} = match;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); 
  const [dates, setDates] = useState(1); 
  const [chartDate, setChartDate] = useState([]); 
  const [chartPrice, setChartPrice] = useState([]); 
  const [darkMode, setDarkMode] =  useDarkMode("isDarkMode");
  useState(window.localStorage.getItem("isDarkMode"))
  console.log(darkMode);
  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  const getCoin = useCallback(async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
    setData(result.data);
  },[coin])

  const getCoinChartData = useCallback(async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${dates}`);
    //console.log(result.data.prices);
    const dateArr = [];
    const priceArr = [];
    result.data.prices.map(price => {
      const date = new Date(price[0]);
      //console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
      dateArr.push(`${date.getYear()}/${date.getMonth() + 1}/${date.getDate()}`);
      priceArr.push(price[1].toFixed(0).toLocaleString());
      return null;
    });
    setChartDate(dateArr);
    setChartPrice(priceArr);
  },[coin, dates])

  //console.log(`chartDate ->`, chartDate);
  //console.log(`charPrice ->`, chartPrice);

  useEffect(() => {
    setLoading(true);
    getCoin();
    getCoinChartData();
    setLoading(false);
  },[getCoin, getCoinChartData])

  return <div className="coin-route__wrapper">
    <div className="coin-titlebg"><span className="coin-title">{coin}</span></div>
    <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={darkMode ? 'toggle toggled' : 'toggle'}
        />
    </div>
    {
      loading ? <h1>Loading...</h1> : <>
        <select onChange={e => setDates(e.target.value)}>
          <option value="1">1Day</option>
          <option value="7">7Day</option>
          <option value="14">14Day</option>
          <option value="30">1Month</option>
          <option value="90">3Month</option>
          <option value="180">6Month</option>
          <option value="365">1Year</option>
          <option value="1095">3Year</option>
        </select>
        <Chart chartDate={chartDate} chartPrice={chartPrice} coin={coin} />
        <Details data={data} />
        <button
          onClick={() => {
              history.goBack();
          }}
        >
        Go Back
        </button>
      </>
    }
  </div>
}

export default Coin;