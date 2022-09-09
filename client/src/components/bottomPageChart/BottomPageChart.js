import React from "react";
import "./BottomPageChart.css";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const BottomPageChart = () => {
  return <Bar />;
};

export default BottomPageChart;
