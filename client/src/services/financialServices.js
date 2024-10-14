import axios from "axios";

const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const getFinancialData = async () => {
  try {
    const response = await axios.get(`${Backend_URL}/api/financial/get`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getFinancialDataById = async (id) => {
  try {
    const response = await axios.get(`${Backend_URL}/api/financial/get/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const createFinancial = async (data) => {
  try {
    const response = await axios.post(
      `${Backend_URL}/api/financial/create`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateFinancial = async (id, data) => {
  try {
    const response = await axios.patch(
      `${Backend_URL}/api/financial/update/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteFinancial = async (id) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/api/financial/delete/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
