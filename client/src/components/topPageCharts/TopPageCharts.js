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
        radius: 0,
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

  return (
    <div className="top-chart-container">
      <div className="first-chart">
        <h4>Day Orders </h4>
        <h1 className="big-number">{state.dayOrders}₪</h1>
        <Line
          className="line-chart"
          data={state.ordersByDateData}
          options={lineChartOptions}
        />
      </div>
      <div className="second-chart">
        <h4>Day Incomes</h4>
        <h1 className="big-number">{state.dayIncome}₪</h1>
        <Line
          className="line-chart"
          data={state.incomeByDateData}
          options={lineChartOptions}
        />
      </div>
      <div className="third-chart">
        <h4>Day Profits</h4>
        <h1 className="big-number">{state.dayProfit}₪</h1>
        <Line
          className="line-chart"
          data={state.profitByDateData}
          options={lineChartOptions}
        />
      </div>
    </div>
  );
};

export default TopPageCharts;
