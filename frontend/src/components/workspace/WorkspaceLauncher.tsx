import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Command,
  Compass,
} from "lucide-react";
import { navigation, type NavItem } from "../../config/navigation";
import { accentThemes } from "../../config/theme";

const moduleCapabilities: Record<string, string[]> = {
  dashboard: [
    "Real-time KPI monitoring",
    "Executive summary metrics",
    "Live activity feed",
  ],
  upload: [
    "CSV & Excel dataset import",
    "Schema auto-detection",
    "Data health validation",
  ],
  analytics: [
    "Multivariate trend exploration",
    "Custom BI chart builder",
    "Segment breakdown",
  ],
  forecast: [
    "Predictive revenue modeling",
    "Demand & sales trends",
    "ML confidence scores",
  ],
  "ai-insights": [
    "Generative recommendations",
    "Automated anomaly alerts",
    "Strategic action items",
  ],
  "decision-intelligence": [
    "What-If scenario simulator",
    "AI-guided decision support",
    "Risk & trade-off evaluation",
  ],
  reports: [
    "Executive PDF/CSV export",
    "Scheduled email digests",
    "Custom report templates",
  ],
  settings: [
    "User profile & security",
    "Workspace team permissions",
    "API & integration keys",
  ],
};

export default function WorkspaceLauncher() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const focusedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeItem: NavItem = navigation[focusedIndex] || navigation[0];
  const activeTheme = accentThemes[activeItem.color];

  const handleLaunch = useCallback(
    (path: string) => {
      if (isLaunching) return;
      setIsLaunching(true);
      setTimeout(() => {
        navigate(path);
      }, 220);
    },
    [isLaunching, navigate]
  );

  // Keyboard Navigation (Up, Down, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % navigation.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + navigation.length) % navigation.length
        );
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activeItem) {
          handleLaunch(activeItem.path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handleLaunch]);

  return (
    <motion.div
      animate={{
        opacity: isLaunching ? 0 : 1,
        scale: isLaunching ? 1.03 : 1,
        filter: isLaunching ? "blur(6px)" : "blur(0px)",
      }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-slate-50/80 font-sans text-slate-900 select-none"
    >
      {/* Background Subtle Mesh & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,246,255,0.8),_transparent_65%),radial-gradient(ellipse_at_bottom_right,_rgba(241,245,249,0.9),_transparent_70%)]" />

      {/* Top Navbar Header */}
      <header className="relative z-20 flex h-20 items-center justify-between px-8 md:px-12">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-600 shadow-2xs transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
            title="Return to Landing Page"
            aria-label="Return to Landing Page"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs">
              D
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                DecisioAI
              </span>
              <span className="ml-2.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                Workspace Launcher
              </span>
            </div>
          </div>
        </div>

        {/* Shortcut Hint */}
        <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
          <span className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[11px] text-slate-600 shadow-2xs">
            <Command size={12} /> ↑ ↓
          </span>
          <span>hover or use keys to navigate</span>
          <span className="mx-1 text-slate-300">•</span>
          <span className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[11px] text-slate-600 shadow-2xs">
            Enter
          </span>
          <span>to launch</span>
        </div>
      </header>

      {/* Main Interactive Spatial Workspace composition */}
      <main className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl items-center px-6 py-6 lg:px-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Interactive Module Selection List */}
          <div className="space-y-3 lg:col-span-6 xl:col-span-6">
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <Compass size={14} />
                <span>Select Destination</span>
              </div>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Choose your workspace
              </h1>
            </div>

            <div className="space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isFocused = focusedIndex === index;
                const itemTheme = accentThemes[item.color];

                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleLaunch(item.path)}
                    animate={{
                      x: isFocused ? 14 : 0,
                      scale: isFocused ? 1.02 : 0.985,
                      opacity: isFocused ? 1 : 0.45,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }}
                    className="cursor-pointer"
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLaunch(item.path);
                      }}
                      className={`group relative flex items-center justify-between rounded-2xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isFocused
                          ? `border ${itemTheme.launcherBorder} ${itemTheme.launcherItemBg} bg-white shadow-xl ${itemTheme.launcherShadow}`
                          : "border border-transparent bg-transparent hover:border-slate-200/60 hover:bg-white/40"
                      }`}
                      aria-selected={isFocused}
                    >
                      {/* Active Indicator Bar */}
                      {isFocused && (
                        <motion.div
                          layoutId="launcherActiveBar"
                          className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full ${itemTheme.navIndicator}`}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <div className="flex items-center gap-4">
                        {/* Number Index */}
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isFocused ? itemTheme.navIconActive : "text-slate-400"
                          }`}
                        >
                          0{index + 1}
                        </span>

                        {/* Icon Badge */}
                        <motion.div
                          animate={{
                            scale: isFocused ? 1.1 : 1,
                          }}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                            isFocused
                              ? itemTheme.launcherIconBg
                              : "bg-slate-200/70 text-slate-500 group-hover:bg-slate-300/80 group-hover:text-slate-700"
                          }`}
                        >
                          <Icon size={20} />
                        </motion.div>

                        {/* Module Name & Tagline */}
                        <div>
                          <h3
                            className={`text-lg font-bold transition-colors ${
                              isFocused ? "text-slate-900" : "text-slate-600"
                            }`}
                          >
                            {item.label}
                          </h3>
                          {isFocused && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-0.5 text-xs text-slate-500 line-clamp-1"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* Right Launch Trigger Icon */}
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                          isFocused
                            ? `${itemTheme.launcherItemBg} ${itemTheme.navIconActive} opacity-100`
                            : "opacity-0 group-hover:opacity-60"
                        }`}
                      >
                        <ChevronRight size={18} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Live Showcase & Detail Card (Desktop) */}
          <div className="hidden lg:col-span-6 lg:block xl:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 24, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-2xl shadow-slate-900/5"
              >
                {/* Decorative Accent Header Line */}
                <div className={`absolute left-0 top-0 h-1.5 w-full ${activeTheme.navIndicator}`} />

                <div className="relative">
                  {/* Badge & Index */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold ${activeTheme.launcherBadgeBg} ${activeTheme.launcherBadgeText}`}>
                      <Sparkles size={14} className={activeTheme.navIconActive} />
                      Module 0{focusedIndex + 1} of 08
                    </span>

                    <span className="font-mono text-xs font-bold text-slate-400">
                      {activeItem.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-8 flex items-center gap-5">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${activeTheme.launcherIconBg}`}>
                      {(() => {
                        const ActiveIcon = activeItem.icon;
                        return <ActiveIcon size={32} />;
                      })()}
                    </div>

                    <div>
                      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        {activeItem.label}
                      </h2>
                      <p className={`mt-1 text-xs font-medium ${activeTheme.navIconActive}`}>
                        DecisioAI Core Suite
                      </p>
                    </div>
                  </div>

                  {/* Comprehensive Description */}
                  <p className="mt-6 text-sm leading-relaxed text-slate-600">
                    {activeItem.description}
                  </p>

                  {/* Module Capabilities List */}
                  <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities
                    </span>

                    <div className="space-y-2">
                      {(
                        moduleCapabilities[activeItem.id] || [
                          "Enterprise data intelligence",
                          "Seamless system integration",
                          "High-throughput analysis",
                        ]
                      ).map((capability, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-xs text-slate-700"
                        >
                          <CheckCircle2
                            size={16}
                            className={`shrink-0 ${activeTheme.navIconActive}`}
                          />
                          <span className="font-medium">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Launch CTA Trigger Button */}
                  <div className="mt-10 border-t border-slate-100 pt-6">
                    <button
                      onClick={() => handleLaunch(activeItem.path)}
                      className={`group flex w-full items-center justify-between rounded-2xl px-6 py-4 font-semibold text-white transition-all duration-200 hover:shadow-lg ${activeTheme.launcherButtonBg} ${activeTheme.launcherButtonHover}`}
                    >
                      <span className="text-sm">Launch {activeItem.label}</span>
                      <div className="flex items-center gap-2 text-xs font-normal opacity-90">
                        <span>Open Workspace</span>
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>


      {/* Bottom Footer Status Bar */}
      <footer className="relative z-20 flex h-14 items-center justify-between border-t border-slate-200/60 px-8 text-xs text-slate-400 md:px-12">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-600">DecisioAI Platform Ready</span>
        </div>

        <div>
          <span>Enterprise SaaS Edition &bull; Keyboard Accessible</span>
        </div>
      </footer>
    </motion.div>
  );
}
