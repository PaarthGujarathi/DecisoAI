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
import DecisionHubPage from "../pages/Decision/DecisionHubPage";
import DecisionGuidePage from "../pages/Decision/DecisionGuidePage";
import SimulatorPage from "../pages/Simulator/SimulatorPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import SettingsPage from "../pages/Settings/SettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route element={<LandingLayout />}>
          <Route index path="/" element={<HomePage />} />
        </Route>

        {/* Workspace Selection */}
        <Route element={<WorkspaceLayout />}>
          <Route path="/workspace" element={<WorkspacePage />} />
        </Route>

        {/* Application */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="ai-insights" element={<AIInsightsPage />} />

          {/* Decision Intelligence Hub & Sub-routes */}
          <Route path="decision" element={<DecisionHubPage />} />
          <Route path="decision/what-if" element={<SimulatorPage />} />
          <Route path="decision/guide" element={<DecisionGuidePage />} />

          {/* Backwards compatibility redirects */}
          <Route path="decision-hub" element={<Navigate to="/app/decision" replace />} />
          <Route path="simulator" element={<Navigate to="/app/decision/what-if" replace />} />

          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}