import axios from "axios";

async function getNumOfOrder(dayRange) {
  try {
    const { data } = await axios.get("/ordersByDate", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getIncomeByDate(dayRange) {
  try {
    const { data } = await axios.get("/totalDayIncome", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitByDate(dayRange) {
  try {
    const { data } = await axios.get("/totalDayProfit", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getTopTenItems(dayRange) {
  try {
    const { data } = await axios.get("/mostSoldItems", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitPrecentage(dayRange) {
  try {
    const { data } = await axios.get("/profitPrecentage", {
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
