import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import orderPerDayReducer from "./reducers/orderPerDayReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  orderPerDayReducer,
});

const store = configureStore({
  reducer: allReducers,
  middleware: [thunkMiddleware],
});

export default store;
