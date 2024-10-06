import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/appointment/create`,
      data
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/appointment/get`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/appointment/delete/${id}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};