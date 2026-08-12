// Centralized TypeScript Type Definitions Foundation

export type Role = "admin" | "teacher" | "student";
export type AcademicLevel = "first" | "second" | "third";

export interface User {
  _id: string;
  name: string;
  email?: string;
  role?: Role;
  level?: AcademicLevel;
  group?: string | Group;
  phone: string;
  parentPhone?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Group {
  _id: string;
  name: string;
  level: AcademicLevel;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceRecord {
  studentID: string | User;
  isPresent: boolean;
}

export interface AttendanceSheet {
  _id: string;
  groupID: string | Group;
  date: string;
  present: AttendanceRecord[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ExamResult {
  studentID: string | User;
  marks: number;
}

export interface Exam {
  _id: string;
  title: string;
  groupID: string | Group;
  date: string;
  maxMarks: number;
  results: ExamResult[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExamStudentResultItem {
  studentID: string;
  marks: number;
}

export interface CreateExamPayload {
  title: string;
  date: string;
  maxMarks: number;
  results: ExamStudentResultItem[];
}

export interface UpdateExamPayload {
  title?: string;
  date?: string;
  maxMarks?: number;
}

export interface UpdateStudentMarkPayload {
  studentID: string;
  marks: number;
}

export interface Payment {
  _id: string;
  studentID: string | User;
  groupID: string | Group;
  month: string;
  isPaid: boolean;
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}
