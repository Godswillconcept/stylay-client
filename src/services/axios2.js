import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://stylay-api.localtunnel.me/api/v1/",
});

const auth_token = localStorage.getItem("token");

axiosInstance.interceptors.request.use((config) => {
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw error;
  }
);

export default axiosInstance;