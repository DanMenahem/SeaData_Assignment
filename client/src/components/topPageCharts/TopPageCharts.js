import React from "react";
import "./TopPageCharts.css";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const TopPageCharts = () => {
  const state = useSelector((state) => state.orderPerDayReducer);

  return (
    <div className="top-chart-container">
      <div className="first-chart">
        <h4>title</h4>
        <h1 className="big-number">2135</h1>
        <Line
          className="line-chart"
          data={state.data}
          options={state.chartOptions}
        />
      </div>
      <div className="second-chart">
        <h4>title</h4>
        <h1 className="big-number">510</h1>
        <Line
          className="line-chart"
          data={state.incomeByDateData}
          options={state.chartOptions}
        />
      </div>
      <div className="third-chart">
        <h4>title</h4>
        <h1 className="big-number">38</h1>
        <Line
          className="line-chart"
          data={state.profitByDateData}
          options={state.chartOptions}
        />
      </div>
    </div>
  );
};

export default TopPageCharts;
