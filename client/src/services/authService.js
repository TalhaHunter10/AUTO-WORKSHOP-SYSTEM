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
        const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password }, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response.data
    }
}