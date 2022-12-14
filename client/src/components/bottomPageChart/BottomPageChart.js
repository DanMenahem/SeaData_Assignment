import React, { useEffect } from "react";
import "./BottomPageChart.css";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const BottomPageChart = () => {
  const state = useSelector((state) => state.orderPerDayReducer);
  const barChartOptions = {
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

  const doughnutChartOptions = {
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

  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.name,
    },
    {
      name: "Quantity",
      selector: (row) => row.value,
    },
  ];

  return (
    <div className="bottom-chart-container">
      <div className="bottom-bar-chart-container">
        <p className="bottom-chart-title">10 Most Sold Items</p>
        <Bar
          className="bar-chart"
          data={state.topTenItemsData}
          options={barChartOptions}
        />
      </div>
      <div className="bottom-table-container">
        <p className="bottom-chart-title">Details</p>
        <DataTable
          className="bottom-table"
          columns={columns}
          data={state.tableData}
        />
      </div>
      <div className="bottom-doughnut-chart-container">
        <p className="bottom-chart-title">Profit Percentage</p>
        <h1 className="big-number">{state.presentageProfit}%</h1>
        <Doughnut
          className="doughnut-chart"
          data={state.profitPresentageData}
          options={doughnutChartOptions}
        />
      </div>
    </div>
  );
};

export default BottomPageChart;
