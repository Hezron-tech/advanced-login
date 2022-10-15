import axios from "axios";
import { API_URL } from "../http";

export const checkAuth = async (refreshToken) => {
    try {
        const response = await axios.get(`${API_URL}/refresh`, {
            headers: {
                token: refreshToken
            }
        }, {
            withCredentials: true,
        });

        console.log(response.data.refreshToken);
        localStorage.setItem('token', response.data.accessToken);
        return response.data

    } catch (error) {
        console.log(error);
    }
}