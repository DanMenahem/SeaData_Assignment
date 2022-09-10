import React from "react";
import "./TopPageCharts.css";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const TopPageCharts = () => {
  const state = useSelector((state) => state.orderPerDayReducer);
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };
  const dayRange = state.dayRange;

  if (dayRange === 1) {
    return (
      <div className="top-chart-container">
        <div className="first-chart2">
          <p className="top-chart-title">Day Orders </p>
          <h1 className="big-number2">
            {new Intl.NumberFormat().format(state.dayOrders)}
          </h1>
        </div>
        <div className="second-chart2">
          <p className="top-chart-title">Day Incomes</p>
          <h1 className="big-number2">
            {new Intl.NumberFormat().format(state.dayIncome)}₪
          </h1>
        </div>
        <div className="third-chart2">
          <p className="top-chart-title">Day Profits</p>
          <h1 className="big-number2">
            {new Intl.NumberFormat().format(state.dayProfit)}₪
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="top-chart-container">
        <div className="first-chart">
          <p className="top-chart-title">Day Orders </p>
          <h1 className="big-number">
            {new Intl.NumberFormat().format(state.dayOrders)}
          </h1>
          <Line
            className="line-chart"
            data={state.ordersByDateData}
            options={lineChartOptions}
          />
        </div>
        <div className="second-chart">
          <p className="top-chart-title">Day Incomes</p>
          <h1 className="big-number">
            {new Intl.NumberFormat().format(state.dayIncome)}₪
          </h1>
          <Line
            className="line-chart"
            data={state.incomeByDateData}
            options={lineChartOptions}
          />
        </div>
        <div className="third-chart">
          <p className="top-chart-title">Day Profits</p>
          <h1 className="big-number">
            {new Intl.NumberFormat().format(state.dayProfit)}₪
          </h1>
          <Line
            className="line-chart"
            data={state.profitByDateData}
            options={lineChartOptions}
          />
        </div>
      </div>
    );
  }
};

export default TopPageCharts;
