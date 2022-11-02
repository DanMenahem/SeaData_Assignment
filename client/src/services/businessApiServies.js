import axios from "axios";

async function getNumOfOrder(dayRange) {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/ordersByDate", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getIncomeByDate(dayRange) {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/totalDayIncome", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitByDate(dayRange) {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/totalDayProfit", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getTopTenItems(dayRange) {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/mostSoldItems", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitPrecentage(dayRange) {
  try {
    const { data } = await axios.get("http://127.0.0.1:5000/profitPrecentage", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default {
  getNumOfOrder,
  getIncomeByDate,
  getProfitByDate,
  getTopTenItems,
  getProfitPrecentage,
};
