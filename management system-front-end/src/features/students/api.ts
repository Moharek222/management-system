import apiClient from "../../services/apiClient";
import type { User, ApiResponse, AcademicLevel } from "../../types";

export const getStudentsByLevelApi = async (level: AcademicLevel): Promise<ApiResponse<User[]>> => {
  const response = await apiClient.get<ApiResponse<User[]>>("/api/userstudents");
  const filteredData = (response.data.data || []).filter((s) => s.level === level);
  return {
    ...response.data,
    data: filteredData,
  };
};

export const getStudentByIdApi = async (id: string): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/api/userstudent/${id}`);
  return response.data;
};
