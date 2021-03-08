import React from "react";
import {Line, Bar} from 'react-chartjs-2';
import '../assets/css/kryptokit-dashboard-react.min.css';

const Chart = ({chartDate, chartPrice, coin}) => {
  const data = {
    labels: chartDate,
    datasets: [
      {
        label: coin,
        data: chartPrice,
        borderColor: "#ddd",
        backgroundColor: "orange",
        fill: ""
      }
    ]
  }
  //console.log(chartDate);
  //console.log(chartPrice);
  return <div className="chart-wrapper">
    <Line data={data} />
  </div>
}

export default Chart;