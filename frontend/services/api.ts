import axios from "axios";
import { Platform } from "react-native";

const YOUR_LOCAL_IP_ADDRESS = '' //Add IP of backend-server

const baseURL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_SERVER_URL
    : "http://localhost:3000/";

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
