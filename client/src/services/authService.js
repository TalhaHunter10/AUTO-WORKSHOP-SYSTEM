import axios from 'axios'
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const checkLoginStatus = async () => {
    try {
        const response = await axios.get(`${backendUrl}/api/auth/loggedin`)
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${backendUrl}/api/auth/register_user`, user)
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const confirmEmail = async (email, verificationCode) => {
    try {
        const response = await axios.post(`${backendUrl}/api/auth/email_verification`, { email, verificationCode })
        return response;
    } catch (error) {
        return error.response.data
    }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/logout`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/forgotpassword`, {
      email,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (email, resetToken, password) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/auth/resetpassword/${resetToken}`,
      { email, password }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePassword = async (oldpassword, password) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/api/auth/changepassword`,
      {
        oldpassword,
        password,
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};