import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";

function Sidebar() {
  return (
    <aside className="fixed left-6 top-6 bottom-6 w-72 rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* Logo */}
      <div className="border-b border-slate-100 px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">
          DecisioAI
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          AI Business Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 p-5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={clsx(
                      "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-white/20"
                        : "bg-slate-100 group-hover:bg-white"
                    )}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {item.label}
                    </span>

                    <span
                      className={clsx(
                        "text-xs",
                        isActive
                          ? "text-blue-100"
                          : "text-slate-400"
                      )}
                    >
                      {item.description}
                    </span>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 p-6">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">
          <p className="text-sm font-semibold">
            DecisioAI v1.0
          </p>

          <p className="mt-1 text-xs text-blue-100">
            Business Intelligence Platform
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;