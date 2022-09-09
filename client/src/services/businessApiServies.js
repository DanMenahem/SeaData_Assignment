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

export async function getProfiteByDate(dayRange) {
  try {
    const { data } = await axios.get("/totalDayProfit", {
      params: { day: dayRange },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default { getNumOfOrder, getIncomeByDate, getProfiteByDate };
