import type { NavItem } from "./navigation";

export type ModuleColor = NavItem["color"];

export interface AccentTheme {
  // Sidebar & Navigation
  navActiveBg: string;
  navActiveText: string;
  navIndicator: string;
  navIconActive: string;

  // Subtle Surface Background
  surfaceBg: string;

  // Workspace Launcher Theme
  launcherBorder: string;
  launcherBadgeBg: string;
  launcherBadgeText: string;
  launcherIconBg: string;
  launcherButtonBg: string;
  launcherButtonHover: string;
  launcherItemBg: string;
  launcherShadow: string;
}

export const accentThemes: Record<ModuleColor, AccentTheme> = {
  blue: {
    navActiveBg: "bg-blue-50/80",
    navActiveText: "text-blue-900 font-semibold",
    navIndicator: "bg-blue-600",
    navIconActive: "text-blue-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(239,246,255,0.65),_rgba(248,250,252,1))]",
    launcherBorder: "border-blue-300/90",
    launcherBadgeBg: "bg-blue-50/80 border-blue-200/80",
    launcherBadgeText: "text-blue-700",
    launcherIconBg: "bg-blue-600 text-white shadow-blue-600/30",
    launcherButtonBg: "bg-blue-600 shadow-blue-600/25",
    launcherButtonHover: "hover:bg-blue-700",
    launcherItemBg: "bg-blue-50/40",
    launcherShadow: "shadow-blue-950/5",
  },
  emerald: {
    navActiveBg: "bg-emerald-50/80",
    navActiveText: "text-emerald-900 font-semibold",
    navIndicator: "bg-emerald-600",
    navIconActive: "text-emerald-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(236,253,245,0.65),_rgba(248,250,252,1))]",
    launcherBorder: "border-emerald-300/90",
    launcherBadgeBg: "bg-emerald-50/80 border-emerald-200/80",
    launcherBadgeText: "text-emerald-700",
    launcherIconBg: "bg-emerald-600 text-white shadow-emerald-600/30",
    launcherButtonBg: "bg-emerald-600 shadow-emerald-600/25",
    launcherButtonHover: "hover:bg-emerald-700",
    launcherItemBg: "bg-emerald-50/40",
    launcherShadow: "shadow-emerald-950/5",
  },
  violet: {
    navActiveBg: "bg-violet-50/80",
    navActiveText: "text-violet-900 font-semibold",
    navIndicator: "bg-violet-600",
    navIconActive: "text-violet-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(245,243,255,0.65),_rgba(248,250,252,1))]",
    launcherBorder: "border-violet-300/90",
    launcherBadgeBg: "bg-violet-50/80 border-violet-200/80",
    launcherBadgeText: "text-violet-700",
    launcherIconBg: "bg-violet-600 text-white shadow-violet-600/30",
    launcherButtonBg: "bg-violet-600 shadow-violet-600/25",
    launcherButtonHover: "hover:bg-violet-700",
    launcherItemBg: "bg-violet-50/40",
    launcherShadow: "shadow-violet-950/5",
  },
  amber: {
    navActiveBg: "bg-amber-50/80",
    navActiveText: "text-amber-950 font-semibold",
    navIndicator: "bg-amber-500",
    navIconActive: "text-amber-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(254,243,199,0.5),_rgba(248,250,252,1))]",
    launcherBorder: "border-amber-300/90",
    launcherBadgeBg: "bg-amber-50/80 border-amber-200/80",
    launcherBadgeText: "text-amber-800",
    launcherIconBg: "bg-amber-500 text-white shadow-amber-500/30",
    launcherButtonBg: "bg-amber-600 shadow-amber-600/25",
    launcherButtonHover: "hover:bg-amber-700",
    launcherItemBg: "bg-amber-50/40",
    launcherShadow: "shadow-amber-950/5",
  },
  rose: {
    navActiveBg: "bg-rose-50/80",
    navActiveText: "text-rose-950 font-semibold",
    navIndicator: "bg-rose-600",
    navIconActive: "text-rose-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(255,241,242,0.65),_rgba(248,250,252,1))]",
    launcherBorder: "border-rose-300/90",
    launcherBadgeBg: "bg-rose-50/80 border-rose-200/80",
    launcherBadgeText: "text-rose-700",
    launcherIconBg: "bg-rose-600 text-white shadow-rose-600/30",
    launcherButtonBg: "bg-rose-600 shadow-rose-600/25",
    launcherButtonHover: "hover:bg-rose-700",
    launcherItemBg: "bg-rose-50/40",
    launcherShadow: "shadow-rose-950/5",
  },
  indigo: {
    navActiveBg: "bg-indigo-50/80",
    navActiveText: "text-indigo-950 font-semibold",
    navIndicator: "bg-indigo-600",
    navIconActive: "text-indigo-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(238,242,255,0.65),_rgba(248,250,252,1))]",
    launcherBorder: "border-indigo-300/90",
    launcherBadgeBg: "bg-indigo-50/80 border-indigo-200/80",
    launcherBadgeText: "text-indigo-700",
    launcherIconBg: "bg-indigo-600 text-white shadow-indigo-600/30",
    launcherButtonBg: "bg-indigo-600 shadow-indigo-600/25",
    launcherButtonHover: "hover:bg-indigo-700",
    launcherItemBg: "bg-indigo-50/40",
    launcherShadow: "shadow-indigo-950/5",
  },
  orange: {
    navActiveBg: "bg-orange-50/80",
    navActiveText: "text-orange-950 font-semibold",
    navIndicator: "bg-orange-600",
    navIconActive: "text-orange-600",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(255,237,213,0.55),_rgba(248,250,252,1))]",
    launcherBorder: "border-orange-300/90",
    launcherBadgeBg: "bg-orange-50/80 border-orange-200/80",
    launcherBadgeText: "text-orange-800",
    launcherIconBg: "bg-orange-600 text-white shadow-orange-600/30",
    launcherButtonBg: "bg-orange-600 shadow-orange-600/25",
    launcherButtonHover: "hover:bg-orange-700",
    launcherItemBg: "bg-orange-50/40",
    launcherShadow: "shadow-orange-950/5",
  },
  slate: {
    navActiveBg: "bg-slate-100/90",
    navActiveText: "text-slate-900 font-semibold",
    navIndicator: "bg-slate-700",
    navIconActive: "text-slate-700",
    surfaceBg: "bg-[radial-gradient(ellipse_at_top,_rgba(241,245,249,0.7),_rgba(248,250,252,1))]",
    launcherBorder: "border-slate-300/90",
    launcherBadgeBg: "bg-slate-100/80 border-slate-200/80",
    launcherBadgeText: "text-slate-800",
    launcherIconBg: "bg-slate-700 text-white shadow-slate-700/30",
    launcherButtonBg: "bg-slate-800 shadow-slate-800/25",
    launcherButtonHover: "hover:bg-slate-900",
    launcherItemBg: "bg-slate-100/50",
    launcherShadow: "shadow-slate-950/5",
  },
};
