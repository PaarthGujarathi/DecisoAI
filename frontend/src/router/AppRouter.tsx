import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingLayout from "../layouts/LandingLayout";
import WorkspaceLayout from "../layouts/WorkspaceLayout";
import AppLayout from "../layouts/AppLayout";

import HomePage from "../pages/Home/HomePage";
import WorkspacePage from "../pages/Workspace/WorkspacePage";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import UploadPage from "../pages/Upload/UploadPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import ForecastPage from "../pages/Forecast/ForecastPage";
import AIInsightsPage from "../pages/AIInsights/AIInsightsPage";
import SimulatorPage from "../pages/Simulator/SimulatorPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import SettingsPage from "../pages/Settings/SettingsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Workspace Hub */}
        <Route element={<WorkspaceLayout />}>
          <Route path="/workspace" element={<WorkspacePage />} />
        </Route>

        {/* Main Application */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="ai-insights" element={<AIInsightsPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;