import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addPart = async (formData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/parts/add`, formData);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllParts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/parts/getall`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePart = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/parts/deletepart/${id}`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePart = async (id, quantity, price) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/parts/updatepart/${id}`,
      { quantity, price }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
