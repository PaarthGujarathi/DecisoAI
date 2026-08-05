import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { navigation } from "../../config/navigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{
        width: collapsed ? 88 : 270,
      }}
      transition={{
        duration: 0.25,
      }}
      className="border-r border-slate-200 bg-white flex flex-col shadow-sm"
    >
      {/* Logo */}

      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              DecisioAI
            </h1>

            <p className="text-xs text-slate-500">
              Business Intelligence
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200

              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <item.icon size={22} />

            {!collapsed && (
              <div>
                <p className="font-medium">{item.label}</p>

                <p className="text-xs opacity-70">
                  {item.description}
                </p>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">
        {!collapsed ? (
          <div>
            <p className="text-sm font-semibold text-slate-800">
              DecisioAI
            </p>

            <p className="text-xs text-slate-500">
              Version 1.0
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </motion.aside>
  );
}