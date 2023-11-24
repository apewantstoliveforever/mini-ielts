import axios from "axios";
import authHeader from "./auth-header";
import api from '../api/api';
const API_URL = `${api}/api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const postNewReading = (dataSend) => {
  return axios.post(`${api}/posts`, dataSend, { headers: authHeader() });
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  postNewReading
};