import axios from "axios";

const service = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

service.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token");
  }
  return config;
});

service.interceptors.response.use(
  ({ data }) => {
    const code: number = data.code;
    if (code != 200) {
      return Promise.reject(data);
    }
    return data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
