import React, { useEffect } from "react";
import "./DashBoardContainer.css";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/actions";
import TopPageCharts from "../topPageCharts/TopPageCharts";
import BottomPageChart from "../bottomPageChart/BottomPageChart";
import MiddlePageContainer from "../middlePageContainer/MiddlePageContainer";

const DashBoardContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(7));
  }, []);

  return (
    <div className="container">
      <TopPageCharts />
      <MiddlePageContainer />
      <BottomPageChart />
    </div>
  );
};

export default DashBoardContainer;
