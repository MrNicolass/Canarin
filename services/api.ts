import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android"
    ? "http://localhost:3000/"
    : "http://localhost:3000/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;