import axios from "axios";
import { Platform } from "react-native";

const YOUR_LOCAL_IP_ADDRESS = "192.168.1.8"; // <-- SUBSTITUA ESTE VALOR

const baseURL = `http://${YOUR_LOCAL_IP_ADDRESS}:3000/`;

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
