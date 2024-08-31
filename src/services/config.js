import axios from "axios";

const baseURL = import.meta.env.REACT_APP_BACKEND || window.location.origin;
const path = import.meta.env.REACT_APP_BACKEND_PATH || "/api/";

const api = axios.create({
  baseURL: `${baseURL}${path}`,
  timeout: 60000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const authToken = window.localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `JWT ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
