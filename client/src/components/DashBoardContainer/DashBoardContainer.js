import React, { useEffect } from "react";
import "./DashBoardContainer.css";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../redux/actions/actions";
import TopPageCharts from "../topPageCharts/TopPageCharts";
import BottomPageChart from "../bottomPageChart/BottomPageChart";
import MiddlePageContainer from "../middlePageContainer/MiddlePageContainer";

const DashBoardContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.orderPerDayReducer);

  useEffect(() => {
    dispatch(getData(7));
  }, []);

  if (state.error) {
    return (
      <div className="error-container">
        <img
          className="error-image"
          src="https://i.imgur.com/yW2W9SC.png"
          alt="error"
        />
        <h1 className="error-message">Sorry, something went wrong. </h1>
      </div>
    );
  }
  return (
    <div className="container">
      <TopPageCharts />
      <MiddlePageContainer />
      <BottomPageChart />
    </div>
  );
};

export default DashBoardContainer;
