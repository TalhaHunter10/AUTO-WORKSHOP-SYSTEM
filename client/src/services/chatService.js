import axios from "axios";

const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const getChatbotResponse = async (message) => {
  try {
    const res = await axios.post(`${Backend_URL}/api/chat/query`, {
      userMessage: message,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getChatHistory = async () => {
  try {
    const res = await axios.get(`${Backend_URL}/api/chat/messages`);
    return res;
  } catch (error) {
    throw error;
  }
};
