import axios from "axios";

const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const getUserData = async () => {
  try {
    const response = await axios.get(`${Backend_URL}/api/user/getuser`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${Backend_URL}/api/user/update`, user);
    return response;
  } catch (error) {
    return error;
  }
};
