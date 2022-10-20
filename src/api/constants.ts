import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";

export const BASE_URL = "https://restcountries.com/v3.1/name/";

export const fetchCountries = async <T>(name: string): Promise<T> => {
  const data: AxiosResponse<T> = await axiosInstance({
    method: "get",
    url: `${name}`,
    transformResponse: [
      (response) => {
        const reponseArr = Utils.parse(response);
        if (Array.isArray(reponseArr)) {
          console.log("Response while fetching", reponseArr);
          const data = reponseArr?.map((data: { [key: string]: any }) => ({
            name: data?.name?.common,
            flags: data?.flags?.png,
          }));
          return data;
        }
      },
    ],
  });
  return data.data;
};

export class Utils {
  static parse(data: unknown) {
    return typeof data === "string" ? JSON.parse(data) : data;
  }
}

export type ResponseData = {
  name: string;
  flags: string;
};
