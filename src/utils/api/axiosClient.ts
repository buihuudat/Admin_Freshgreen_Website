import axios from "axios";
import queryString from "query-string";
import { getToken } from "../handlers/tokenHandler";

const baseURL = "http://localhost:5000/api/v1";

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any): string => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaber ${getToken()}`,
      },
    };
  },
  (e) => {
    return Promise.reject(e);
  }
);
axiosClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
