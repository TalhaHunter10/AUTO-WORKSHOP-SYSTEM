import axios from "axios";

const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const getManagers = async () => {
  try {
    const response = await axios.get(`${Backend_URL}/api/wm/managers`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteManager = async (id) => {
  try {
    const response = await axios.delete(`${Backend_URL}/api/wm/manager/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
