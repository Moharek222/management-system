import apiClient from "../../services/apiClient";
import type { AttendanceSheet, ApiResponse } from "../../types";

export interface GetAttendanceParams {
  page?: number;
  limit?: number;
}

export const getGroupAttendanceApi = async (
  groupID: string,
  params?: GetAttendanceParams
): Promise<ApiResponse<AttendanceSheet[]>> => {
  const response = await apiClient.get<ApiResponse<AttendanceSheet[]>>(
    `/api/attendance/group/${groupID}`,
    { params }
  );
  return response.data;
};
