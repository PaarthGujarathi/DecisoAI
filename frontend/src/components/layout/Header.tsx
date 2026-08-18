import { Bell, Search, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { navigation } from "../../config/navigation";

function Header() {
  const location = useLocation();

  // Find exact or parent nav item match
  const currentItem = navigation.find(
    (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
  );

  let title = currentItem ? currentItem.label : "Application";
  let description = currentItem ? currentItem.description : "Manage your business intelligence.";
  let subTitle = "";

  if (location.pathname === "/app/decision/what-if") {
    subTitle = "What-If Simulator";
    description = "Test business scenarios, change variables, and compare projected outcomes.";
  } else if (location.pathname === "/app/decision/guide") {
    subTitle = "Decision Guide";
    description = "Describe a business problem and receive AI-powered decision recommendations.";
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#252529] bg-[#0B0B0D] px-8 py-5 backdrop-blur-md">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Left / Title & Breadcrumbs */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#9A9A9A]">
            <Link
              to="/workspace"
              className="rounded-md px-1.5 py-0.5 font-medium text-[#9A9A9A] transition-colors hover:bg-[#17181B] hover:text-[#FF3B30] focus:outline-none focus:ring-2 focus:ring-red-500/40"
              title="Go to Workspace Launcher"
            >
              Workspace
            </Link>

            <ChevronRight size={14} className="text-slate-600" />

            <span className="font-semibold text-[#F5F5F5]">{title}</span>

            {subTitle && (
              <>
                <ChevronRight size={14} className="text-slate-600" />
                <span className="font-semibold text-[#FF3B30]">{subTitle}</span>
              </>
            )}
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#F5F5F5]">
            {subTitle || title}
          </h1>

          <p className="mt-0.5 text-xs text-[#9A9A9A]">{description}</p>
        </div>

        {/* Right / Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#252529] bg-[#111214] px-3.5 py-2 text-xs shadow-2xs focus-within:border-[#E63946] focus-within:bg-[#17181B]">
            <Search size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search tools, datasets..."
              className="w-44 bg-transparent text-[#F5F5F5] outline-none placeholder:text-slate-500 md:w-56"
            />
          </div>

          {/* Notification Button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#252529] bg-[#111214] text-[#9A9A9A] shadow-2xs transition hover:bg-[#17181B] hover:text-[#F5F5F5]"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E63946] text-xs font-bold text-white shadow-xs">
            PS
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;