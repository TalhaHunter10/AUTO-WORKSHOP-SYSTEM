import axios from "axios";

const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const getStats = async () => {
  try {
    const res = await axios.get(`${Backend_URL}/api/dashboard/getstats`);
    return res;
  } catch (error) {
    throw error;
  }
};
