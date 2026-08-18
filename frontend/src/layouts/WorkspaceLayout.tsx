import { Outlet } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";

function WorkspaceLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}

export default WorkspaceLayout;