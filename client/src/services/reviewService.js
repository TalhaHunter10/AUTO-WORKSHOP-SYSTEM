import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createReview = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/api/review/create`, data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getReviews = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/review/all`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
