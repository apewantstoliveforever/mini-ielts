import axios from "axios";
import api from "../api/api";

const register = async (email, password) => {
      await axios.post(`${api}/loginIeltsRoutes/register`, { email, password });
  };
  

const login = async (email, password) => {
    const response = await axios.post(`${api}/loginIeltsRoutes/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
