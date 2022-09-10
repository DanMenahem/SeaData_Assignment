import constants from "../constants";

const initalState = {
  loading: false,
  error: null,
  dayRange: 7,
  dayOrders: 0,
  dayIncome: 0,
  dayProfit: 0,
  presentageProfit: 0,
  ordersByDateData: {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        backgroundColor: "rgba(0,143,248,0.3)",
        borderColor: "rgba(0,143,248,255)",
        pointBorderColor: "rgba(0,143,248,255)",
      },
    ],
  },
  incomeByDateData: {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        backgroundColor: "rgba(0,143,248,0.3)",
        borderColor: "rgba(0,143,248,255)",
        pointBorderColor: "rgba(0,143,248,255)",
      },
    ],
  },
  profitByDateData: {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        backgroundColor: "rgba(0,143,248,0.3)",
        borderColor: "rgba(0,143,248,255)",
        pointBorderColor: "rgba(0,143,248,255)",
      },
    ],
  },
  topTenItemsData: {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        backgroundColor: "rgba(0,143,248,0.3)",
      },
    ],
  },
  tableData: [],
  profitPresentageData: {
    labels: ["Expenses", "Profits"],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
};

const orderPerDayReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case constants.LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case constants.ERROR:
      return {
        ...state,
        error: payload,
      };
    case constants.GET_ORDER_PER_DAY_SUCCESS:
      return {
        ...state,
        dayRange: payload.dayRange,
        dayOrders: AvergeData(payload.ordersByDateData, payload.dayRange),
        ordersByDateData: {
          labels: payload.ordersByDateData.map((item) => item.date),
          datasets: [
            {
              ...state.ordersByDateData.datasets[0],
              data: payload.ordersByDateData.map((item) => item.value),
            },
          ],
        },
      };

    case constants.GET_INCOME_PER_DAY_SUCCESS:
      return {
        ...state,
        dayIncome: AvergeData(payload.incomeByDateData, payload.dayRange),
        incomeByDateData: {
          labels: payload.incomeByDateData.map((item) => item.date),
          datasets: [
            {
              ...state.incomeByDateData.datasets[0],
              data: payload.incomeByDateData.map((item) => item.value),
            },
          ],
        },
      };

    case constants.GET_PROFIT_PER_DAY_SUCCESS:
      return {
        ...state,
        dayProfit: AvergeData(payload.profitByDateData, payload.dayRange),
        profitByDateData: {
          labels: payload.profitByDateData.map((item) => item.date),
          datasets: [
            {
              ...state.profitByDateData.datasets[0],
              data: payload.profitByDateData.map((item) => item.value),
            },
          ],
        },
      };
    case constants.GET_TOP_TEN_ITEMS_SUCCESS:
      return {
        ...state,
        tableData: payload.topTenItemsData,
        topTenItemsData: {
          labels: payload.topTenItemsData.map((item) => item.name),
          datasets: [
            {
              ...state.topTenItemsData.datasets[0],
              data: payload.topTenItemsData.map((item) => item.value),
            },
          ],
        },
      };
    case constants.GET_PROFIT_PRESENTAGE_SUCCESS:
      return {
        ...state,
        presentageProfit: getPrecentage(
          totalProfitPresentageData(payload.profitPresentageData)
        ),
        profitPresentageData: {
          ...state.profitPresentageData,
          datasets: [
            {
              ...state.profitPresentageData.datasets[0],
              data: totalProfitPresentageData(payload.profitPresentageData),
            },
          ],
        },
      };

    default:
      return state;
  }
};

//return the average value by date range
const AvergeData = (arr, days) => {
  const sum = arr.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0);
  if (days === 1) return Math.round(sum / days, 2);
  return (sum / days).toFixed(2);
};

const totalProfitPresentageData = (arr) => {
  const expense = arr.reduce((accumulator, object) => {
    return accumulator + object.expense;
  }, 0);
  const profit = arr.reduce((accumulator, object) => {
    return accumulator + object.profit;
  }, 0);
  return [expense, profit];
};

const getPrecentage = (arr) => {
  return ((arr[1] / arr[0]) * 100).toFixed(2);
};

export default orderPerDayReducer;
