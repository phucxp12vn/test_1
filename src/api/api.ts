import axios from "axios";
const axiosParams = {
  baseURL: "https://api.github.com/",
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

export default axiosInstance;
