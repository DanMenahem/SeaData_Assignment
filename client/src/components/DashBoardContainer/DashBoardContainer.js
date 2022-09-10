import React, { useEffect } from "react";
import "./DashBoardContainer.css";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../redux/actions/actions";
import TopPageCharts from "../topPageCharts/TopPageCharts";
import BottomPageChart from "../bottomPageChart/BottomPageChart";
import ReactLoading from "react-loading";

const DashBoardContainer = () => {
  const loading = useSelector((state) => state.orderPerDayReducer.loading);
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
        <button onClick={() => fetchData(14)}>two Week</button>
        <button onClick={() => fetchData(30)}>Month</button>
        {loading && (
          <ReactLoading
            className="loading"
            type="spin"
            color="#008ff8
          "
            height={50}
            width={25}
          />
        )}
      </div>
      <BottomPageChart />
    </div>
  );
};

export default DashBoardContainer;
