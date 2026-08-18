import type { NavItem } from "./navigation";

export type ModuleColor = NavItem["color"];

export interface AccentTheme {
  // Sidebar & Navigation Active States
  navActiveBg: string;
  navActiveText: string;
  navIndicator: string;
  navIconActive: string;

  // Background Surface
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
    navActiveBg: "bg-[#2A1215]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-[#E63946]",
    navIconActive: "text-[#FF3B30]",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-[#E63946]/50",
    launcherBadgeBg: "bg-[#2A1215] border-[#E63946]/30",
    launcherBadgeText: "text-[#FF3B30]",
    launcherIconBg: "bg-[#E63946] text-white shadow-red-950/40",
    launcherButtonBg: "bg-[#E63946]",
    launcherButtonHover: "hover:bg-[#FF3B30]",
    launcherItemBg: "bg-[#2A1215]/50",
    launcherShadow: "shadow-red-950/20",
  },
  emerald: {
    navActiveBg: "bg-[#112419]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-emerald-500",
    navIconActive: "text-emerald-400",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-emerald-500/50",
    launcherBadgeBg: "bg-[#112419] border-emerald-500/30",
    launcherBadgeText: "text-emerald-400",
    launcherIconBg: "bg-emerald-600 text-white shadow-emerald-950/40",
    launcherButtonBg: "bg-emerald-600",
    launcherButtonHover: "hover:bg-emerald-500",
    launcherItemBg: "bg-[#112419]/50",
    launcherShadow: "shadow-emerald-950/20",
  },
  violet: {
    navActiveBg: "bg-[#1f122a]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-violet-500",
    navIconActive: "text-violet-400",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-violet-500/50",
    launcherBadgeBg: "bg-[#1f122a] border-violet-500/30",
    launcherBadgeText: "text-violet-400",
    launcherIconBg: "bg-violet-600 text-white shadow-violet-950/40",
    launcherButtonBg: "bg-violet-600",
    launcherButtonHover: "hover:bg-violet-500",
    launcherItemBg: "bg-[#1f122a]/50",
    launcherShadow: "shadow-violet-950/20",
  },
  amber: {
    navActiveBg: "bg-[#281b10]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-amber-500",
    navIconActive: "text-amber-400",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-amber-500/50",
    launcherBadgeBg: "bg-[#281b10] border-amber-500/30",
    launcherBadgeText: "text-amber-400",
    launcherIconBg: "bg-amber-500 text-slate-950 font-bold shadow-amber-950/40",
    launcherButtonBg: "bg-amber-600",
    launcherButtonHover: "hover:bg-amber-500",
    launcherItemBg: "bg-[#281b10]/50",
    launcherShadow: "shadow-amber-950/20",
  },
  rose: {
    navActiveBg: "bg-[#2a111b]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-rose-500",
    navIconActive: "text-rose-400",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-rose-500/50",
    launcherBadgeBg: "bg-[#2a111b] border-rose-500/30",
    launcherBadgeText: "text-rose-400",
    launcherIconBg: "bg-rose-600 text-white shadow-rose-950/40",
    launcherButtonBg: "bg-rose-600",
    launcherButtonHover: "hover:bg-rose-500",
    launcherItemBg: "bg-[#2a111b]/50",
    launcherShadow: "shadow-rose-950/20",
  },
  indigo: {
    navActiveBg: "bg-[#2A1215]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-[#E63946]",
    navIconActive: "text-[#FF3B30]",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-[#E63946]/50",
    launcherBadgeBg: "bg-[#2A1215] border-[#E63946]/30",
    launcherBadgeText: "text-[#FF3B30]",
    launcherIconBg: "bg-[#E63946] text-white shadow-red-950/40",
    launcherButtonBg: "bg-[#E63946]",
    launcherButtonHover: "hover:bg-[#FF3B30]",
    launcherItemBg: "bg-[#2A1215]/50",
    launcherShadow: "shadow-red-950/20",
  },
  orange: {
    navActiveBg: "bg-[#2a1810]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-orange-500",
    navIconActive: "text-orange-400",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-orange-500/50",
    launcherBadgeBg: "bg-[#2a1810] border-orange-500/30",
    launcherBadgeText: "text-orange-400",
    launcherIconBg: "bg-orange-600 text-white shadow-orange-950/40",
    launcherButtonBg: "bg-orange-600",
    launcherButtonHover: "hover:bg-orange-500",
    launcherItemBg: "bg-[#2a1810]/50",
    launcherShadow: "shadow-orange-950/20",
  },
  slate: {
    navActiveBg: "bg-[#1C1D21]",
    navActiveText: "text-[#F5F5F5] font-semibold",
    navIndicator: "bg-slate-400",
    navIconActive: "text-slate-300",
    surfaceBg: "bg-[#080808]",
    launcherBorder: "border-slate-600/50",
    launcherBadgeBg: "bg-[#1C1D21] border-slate-700",
    launcherBadgeText: "text-slate-300",
    launcherIconBg: "bg-slate-700 text-white shadow-slate-950/40",
    launcherButtonBg: "bg-slate-700",
    launcherButtonHover: "hover:bg-slate-600",
    launcherItemBg: "bg-[#1C1D21]/50",
    launcherShadow: "shadow-black/40",
  },
};
