import constants from "../constants";

const initalState = {
  loading: false,
  error: null,
  chartOptions: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  },
  data: {
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
};

const orderPerDayReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.GET_ORDER_PER_DAY_AWAITING:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_ORDER_PER_DAY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          labels: payload.map((item) => item.date),
          datasets: [
            {
              ...state.data.datasets[0],
              data: payload.map((item) => item.value),
            },
          ],
        },
      };
    case constants.GET_ORDER_PER_DAY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case constants.GET_INCOME_PER_DAY_AWAITING:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_INCOME_PER_DAY_SUCCESS:
      return {
        ...state,
        loading: false,
        incomeByDateData: {
          labels: payload.map((item) => item.date),
          datasets: [
            {
              ...state.incomeByDateData.datasets[0],
              data: payload.map((item) => item.value),
            },
          ],
        },
      };
    case constants.GET_INCOME_PER_DAY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case constants.GET_PROFIT_PER_DAY_AWAITING:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_PROFIT_PER_DAY_SUCCESS:
      return {
        ...state,
        loading: false,
        profitByDateData: {
          labels: payload.map((item) => item.date),
          datasets: [
            {
              ...state.profitByDateData.datasets[0],
              data: payload.map((item) => item.value),
            },
          ],
        },
      };
    case constants.GET_PROFIT_PER_DAY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderPerDayReducer;
