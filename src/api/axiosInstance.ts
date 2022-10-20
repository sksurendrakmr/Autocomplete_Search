import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants";

const config: AxiosRequestConfig = {
  baseURL: "https://restcountries.com/v3.1/name/",
};

export const axiosInstance = axios.create(config);
