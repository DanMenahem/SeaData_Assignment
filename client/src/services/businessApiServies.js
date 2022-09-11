import axios from "axios";

async function getNumOfOrder(dayRange) {
  try {
    const { data } = await axios.get(
      "https://flask-server-l7k623ctqq-oc.a.run.app/ordersByDate",
      {
        params: { day: dayRange },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

async function getIncomeByDate(dayRange) {
  try {
    const { data } = await axios.get(
      "https://flask-server-l7k623ctqq-oc.a.run.app/totalDayIncome",
      {
        params: { day: dayRange },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitByDate(dayRange) {
  try {
    const { data } = await axios.get(
      "https://flask-server-l7k623ctqq-oc.a.run.app/totalDayProfit",
      {
        params: { day: dayRange },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

async function getTopTenItems(dayRange) {
  try {
    const { data } = await axios.get(
      "https://flask-server-l7k623ctqq-oc.a.run.app/mostSoldItems",
      {
        params: { day: dayRange },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

async function getProfitPrecentage(dayRange) {
  try {
    const { data } = await axios.get(
      "https://flask-server-l7k623ctqq-oc.a.run.app/profitPrecentage",
      {
        params: { day: dayRange },
      }
    );
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
