import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { navigation } from "../../config/navigation";
import { useSidebar } from "../../hooks/useSidebar";
import { accentThemes } from "../../config/theme";

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden"
        aria-label="Open Navigation"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside */}
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: collapsed ? 80 : 260,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200/80 bg-white shadow-xs transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header / Brand Link */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Link
            to="/"
            className="group flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            title="Return to DecisioAI Home Page"
            aria-label="DecisioAI Home Page"
          >
            {!collapsed ? (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-blue-700">
                  D
                </div>
                <div>
                  <h1 className="text-base font-bold leading-none text-slate-900 transition-colors group-hover:text-blue-600">
                    DecisioAI
                  </h1>
                  <p className="mt-1 text-[11px] font-medium text-slate-400">
                    Decision Intelligence
                  </p>
                </div>
              </>
            ) : (
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-blue-700">
                D
              </div>
            )}
          </Link>

          {/* Toggle Button for Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg border border-slate-200/80 p-1.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Close Button for Mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close Navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const theme = accentThemes[item.color];

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${theme.navActiveBg} ${theme.navActiveText} shadow-2xs`
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                title={collapsed ? item.label : undefined}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${theme.navIndicator}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <item.icon
                  size={20}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? theme.navIconActive
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />

                {!collapsed && (
                  <div className="min-w-0 flex-1 truncate">
                    <p className="truncate font-medium">{item.label}</p>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          {!collapsed ? (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-500">DecisioAI SaaS</span>
              <span>v1.0.0</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}