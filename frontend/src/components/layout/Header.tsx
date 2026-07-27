import {
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-slate-100 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Workspace</span>

            <ChevronRight size={16} />

            <span className="font-medium text-slate-700">
              Dashboard
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back. Here's what's happening today.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-52 bg-transparent outline-none"
            />
          </div>

          {/* Notification */}
          <button className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:bg-slate-50">
            <Bell size={20} />
          </button>

          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white shadow-lg">
            PS
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;