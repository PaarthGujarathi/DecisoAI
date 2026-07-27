import { Link } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

function WorkspaceNavbar() {
  return (
    <header className="sticky top-0 z-50 mb-16 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-600">
              DecisioAI
            </h1>

            <p className="text-sm text-slate-500">
              AI Business Decision Intelligence
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100">
            <Bell size={18} />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white shadow-lg">
            PS
          </div>
        </div>
      </div>
    </header>
  );
}

export default WorkspaceNavbar;