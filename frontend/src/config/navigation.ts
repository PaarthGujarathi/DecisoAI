import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  TrendingUp,
  BrainCircuit,
  FlaskConical,
  FileText,
  Settings,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color:
    | "blue"
    | "emerald"
    | "violet"
    | "amber"
    | "pink"
    | "cyan"
    | "orange"
    | "slate";
}

export const navigation: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description:
      "View KPIs, business performance, and recent activity at a glance.",
    icon: LayoutDashboard,
    path: "/app/dashboard",
    color: "blue",
  },
  {
    id: "upload",
    label: "Upload",
    description:
      "Import CSV, Excel, and other datasets for AI-powered analysis.",
    icon: Upload,
    path: "/app/upload",
    color: "emerald",
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Explore interactive charts, trends, and business intelligence metrics.",
    icon: BarChart3,
    path: "/app/analytics",
    color: "violet",
  },
  {
    id: "forecast",
    label: "Forecast",
    description:
      "Predict future sales, revenue, demand, and business growth using AI.",
    icon: TrendingUp,
    path: "/app/forecast",
    color: "amber",
  },
  {
    id: "ai-insights",
    label: "AI Insights",
    description:
      "Receive AI-generated recommendations and actionable business insights.",
    icon: BrainCircuit,
    path: "/app/ai-insights",
    color: "pink",
  },
  {
    id: "simulator",
    label: "Decision Simulator",
    description:
      "Evaluate business scenarios and compare strategies before execution.",
    icon: FlaskConical,
    path: "/app/simulator",
    color: "cyan",
  },
  {
    id: "reports",
    label: "Reports",
    description:
      "Generate, export, and share professional business reports.",
    icon: FileText,
    path: "/app/reports",
    color: "orange",
  },
  {
    id: "settings",
    label: "Settings",
    description:
      "Manage your account, preferences, and application configuration.",
    icon: Settings,
    path: "/app/settings",
    color: "slate",
  },
];