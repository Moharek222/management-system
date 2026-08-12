import apiClient from "../../services/apiClient";
import type { Exam, ApiResponse } from "../../types";

export interface GetExamsParams {
  page?: number;
  limit?: number;
}

export const getGroupExamsApi = async (
  groupID: string,
  params?: GetExamsParams
): Promise<ApiResponse<Exam[]>> => {
  // Real existing endpoint in backend: GET /api/exam/group/:groupID
  const response = await apiClient.get<ApiResponse<Exam[]>>(`/api/exam/group/${groupID}`, { params });
  return response.data;
};
