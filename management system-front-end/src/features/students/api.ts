import apiClient from "../../services/apiClient";
import type { User, ApiResponse, AcademicLevel } from "../../types";

export const getStudentsByLevelApi = async (level: AcademicLevel): Promise<ApiResponse<User[]>> => {
  // Matches backend router definition: GET /api/userstudents/:level
  const response = await apiClient.get<ApiResponse<User[]>>(`/api/userstudents/${level}`);
  return response.data;
};

export const getStudentByIdApi = async (id: string): Promise<ApiResponse<User>> => {
  // Matches backend router definition: GET /api/userstudent/:id
  const response = await apiClient.get<ApiResponse<User>>(`/api/userstudent/${id}`);
  return response.data;
};
