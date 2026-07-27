import { Outlet } from "react-router-dom";

function WorkspaceLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}

export default WorkspaceLayout;