import React from "react";
import "./MiddlePageContainer.css";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../redux/actions/actions";
import ReactLoading from "react-loading";
import Select from "react-select";

const MiddlePageContainer = () => {
  const loading = useSelector((state) => state.orderPerDayReducer.loading);

  const dispatch = useDispatch();

  const fetchData = (dayRange) => {
    dispatch(getData(dayRange));
  };

  const options = [
    { value: 1, label: "today" },
    { value: 7, label: "Last 7 days" },
    { value: 14, label: "last 14 days" },
    { value: 21, label: "last 21 days" },
    { value: 30, label: "last 30 days" },
  ];

  return (
    <div className="middle-Page-Container">
      <h1 className="middle-page-title">Business Tracking</h1>
      <div className="select-container">
        <Select
          className="select-button"
          defaultValue={options[1]}
          options={options}
          onChange={(e) => fetchData(e.value)}
        />
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
    </div>
  );
};

export default MiddlePageContainer;
