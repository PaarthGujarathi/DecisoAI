import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-80 flex min-h-screen flex-1 flex-col">
        <Header />

        <main className="flex-1 px-8 pb-8 pt-6">
          <div className="min-h-[calc(100vh-120px)] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;