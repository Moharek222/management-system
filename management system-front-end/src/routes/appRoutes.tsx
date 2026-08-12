import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./paths";
import { ProtectedRoute, PublicOnlyRoute } from "./ProtectedRoute";
import { AppLayout } from "../components/layout/AppLayout";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { GroupsPage } from "../pages/GroupsPage";
import { GroupDetailsPage } from "../pages/GroupDetailsPage";
import { StudentsPage } from "../pages/StudentsPage";
import { AttendancePage } from "../pages/AttendancePage";
import { ExamsPage } from "../pages/ExamsPage";
import { PaymentsPage } from "../pages/PaymentsPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Only Routes (Redirect to / if already logged in) */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected Routes inside AppLayout (Require authenticated teacher session) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.GROUPS} element={<GroupsPage />} />
          <Route path={ROUTES.GROUP_DETAILS} element={<GroupDetailsPage />} />
          <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
          <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
          <Route path={ROUTES.EXAMS} element={<ExamsPage />} />
          <Route path={ROUTES.PAYMENTS} element={<PaymentsPage />} />
        </Route>
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
