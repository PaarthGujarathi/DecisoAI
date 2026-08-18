import { Outlet } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";

function LandingLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}

export default LandingLayout;