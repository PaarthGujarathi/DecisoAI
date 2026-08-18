import { Link } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

function WorkspaceNavbar() {
  return (
    <header className="sticky top-0 z-40 mb-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left / Back to Home & Brand */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900"
            title="Return to Landing Page"
            aria-label="Return to Landing Page"
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-sm">
              D
            </div>
            <div>
              <h1 className="text-base font-bold leading-none text-slate-900">
                DecisioAI
              </h1>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                Application Launcher
              </p>
            </div>
          </div>
        </div>

        {/* Right / Quick Controls */}
        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-2xs">
            PS
          </div>
        </div>
      </div>
    </header>
  );
}

export default WorkspaceNavbar;