import React, { useEffect } from "react";
import "./DashBoardContainer.css";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/orderPerDayAction";
import TopPageCharts from "../topPageCharts/TopPageCharts";

const DashBoardContainer = () => {
  const dispatch = useDispatch();

  const fetchData = (dayRange) => {
    dispatch(getData(dayRange));
  };

  useEffect(() => {
    fetchData(7);
  }, []);

  return (
    <div className="container">
      <TopPageCharts />
      <div className="button-container">
        <button onClick={() => fetchData(1)}>Today</button>
        <button onClick={() => fetchData(7)}>Week</button>
        <button onClick={() => fetchData(30)}>Month</button>
      </div>
    </div>
  );
};

export default DashBoardContainer;
