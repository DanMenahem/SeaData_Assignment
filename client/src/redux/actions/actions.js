import constants from "../constants";
import businessApiServies from "../../services/businessApiServies";

export const getData = (dayRange) => async (dispatch) => {
  try {
    dispatch({ type: constants.LOADING_START });

    const ordersByDateData = await businessApiServies.getNumOfOrder(dayRange);
    const incomeByDateData = await businessApiServies.getIncomeByDate(dayRange);
    const profitByDateData = await businessApiServies.getProfitByDate(dayRange);
    const topTenItemsData = await businessApiServies.getTopTenItems(dayRange);
    const profitPresentageData = await businessApiServies.getProfitPrecentage(
      dayRange
    );
    console.log(profitPresentageData);
    const payload = {
      ordersByDateData,
      incomeByDateData,
      profitByDateData,
      topTenItemsData,
      profitPresentageData,
    };
    dispatch({ type: constants.GET_ORDER_PER_DAY_SUCCESS, payload: payload });
    dispatch({
      type: constants.GET_INCOME_PER_DAY_SUCCESS,
      payload: payload,
    });
    dispatch({
      type: constants.GET_PROFIT_PER_DAY_SUCCESS,
      payload: payload,
    });
    dispatch({
      type: constants.GET_TOP_TEN_ITEMS_SUCCESS,
      payload: payload,
    });
    dispatch({
      type: constants.GET_PROFIT_PRESENTAGE_SUCCESS,
      payload: payload,
    });
    dispatch({ type: constants.LOADING_END });
  } catch (error) {
    dispatch({ type: constants.LOADING_END });
    dispatch({ type: constants.EROOR, payload: error.message });
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
