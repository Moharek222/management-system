import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiErrorResponse {
  message: string;
  status?: number;
  errors?: any[];
  data?: any;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const formattedError: ApiErrorResponse = {
      message: error.response?.data?.message || error.message || "An unexpected error occurred",
      status: error.response?.status,
      errors: error.response?.data?.errors,
      data: error.response?.data,
    };

    if (!error.response) {
      formattedError.message = "Network error: Unable to connect to the backend server.";
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
