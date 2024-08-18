import axios from "axios";

export const request = axios.create({
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
        localStorage.removeItem("token");
        window.location.href = "/#/login";
        window.location.reload();
        break;
      default:
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
  }
);
