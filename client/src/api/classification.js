import axios from "axios";

const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
