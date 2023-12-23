import axios from "axios";
import authHeader from "./auth-header";
import api from '../api/api';
import axiosInstance from "../api/axiosInstance";

const API_URL = `${api}/api/test/`;

const getPublicContent = () => {
  return axiosInstance.get("all");
};

const getUserBoard = () => {
  return axiosInstance.get("user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axiosInstance.get("mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axiosInstance.get("admin", { headers: authHeader() });
};

const postNewReading = (dataSend) => {
  return axiosInstance.post("/posts", dataSend, { headers: authHeader() });
};

const sendResult = (dataSend) => {
  return axiosInstance.post("/posts/saveResult", dataSend, { headers: authHeader() });
};

const deletePost = (id) => {
  return axiosInstance.delete(`/posts/${id}`, { headers: authHeader() });
};

const getUserResults = () => {
  return axiosInstance.get("/posts/getUserResults", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  postNewReading,
  deletePost,
  sendResult,
  getUserResults
};
