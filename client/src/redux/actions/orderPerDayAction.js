import constants from "../constants";
import businessApiServies from "../../services/businessApiServies";

export const getData = (dayRange) => async (dispatch) => {
  try {
    dispatch({ type: constants.GET_ORDER_PER_DAY_AWAITING });
    const data = await businessApiServies.getNumOfOrder(dayRange);
    dispatch({ type: constants.GET_ORDER_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.GET_ORDER_PER_DAY_ERROR,
      payload: error.message,
    });
  }
  try {
    dispatch({ type: constants.GET_INCOME_PER_DAY_AWAITING });
    const data = await businessApiServies.getIncomeByDate(dayRange);
    dispatch({
      type: constants.GET_INCOME_PER_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_INCOME_PER_DAY_ERROR,
      payload: error.message,
    });
  }
  try {
    dispatch({ type: constants.GET_PROFIT_PROFIT_DAY_AWAITING });
    const data = await businessApiServies.getProfiteByDate(dayRange);
    dispatch({ type: constants.GET_PROFIT_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.GET_PROFIT_PER_DAY_ERROR,
      payload: error.message,
    });
  }
};

export const getIncomeByDate = (dayRange) => async (dispatch) => {
  try {
    dispatch({ type: constants.GET_INCOME_PER_DAY_AWAITING });
    const data = await businessApiServies.getIncomeByDate(dayRange);
    dispatch({ type: constants.GET_INCOME_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.GET_INCOME_PER_DAY_ERROR,
      payload: error.message,
    });
  }
};

export const getProfitByDate = (dayRange) => async (dispatch) => {
  try {
    dispatch({ type: constants.GET_PROFIT_PROFIT_DAY_AWAITING });
    const data = await businessApiServies.getProfitByDate(dayRange);
    dispatch({ type: constants.GET_PROFIT_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.GET_PROFIT_PER_DAY_ERROR,
      payload: error.message,
    });
  }
};
