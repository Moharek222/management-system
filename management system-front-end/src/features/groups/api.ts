import apiClient from "../../services/apiClient";
import type { Group, ApiResponse, AcademicLevel } from "../../types";

export interface GetGroupsParams {
  level?: AcademicLevel;
  page?: number;
  limit?: number;
}

export const getGroupsApi = async (params?: GetGroupsParams): Promise<ApiResponse<Group[]>> => {
  const response = await apiClient.get<ApiResponse<Group[]>>("/api/group", { params });
  return response.data;
};

export const getGroupByIdApi = async (id: string): Promise<ApiResponse<Group>> => {
  const response = await apiClient.get<ApiResponse<Group>>(`/api/group/${id}`);
  return response.data;
};
