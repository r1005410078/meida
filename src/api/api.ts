import { notification } from "antd";
import axios from "axios";

export const request = axios.create({
  // baseURL: "http://114.55.227.206:8000",
  baseURL: "",
  timeout: 1000,
  headers: {
    token: localStorage.getItem("token"),
  },
});

request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 401:
        // localStorage.removeItem("token");
        // window.location.href = "/#/login";
        // window.location.reload();
        break;
      case 404:
        break;
      default:
      // notification.error({
      //   message: "系统错误，请联系管理员！",
      //   description: error.message,
      // });

      // return;
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
    }

    return Promise.reject(error);
  }
);
