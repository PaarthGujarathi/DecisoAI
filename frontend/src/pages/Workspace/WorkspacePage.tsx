import WorkspaceGrid from "../../components/workspace/WorkspaceGrid";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import WorkspaceNavbar from "../../components/workspace/WorkspaceNavbar";

function WorkspacePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />

      {/* Decorative Blobs */}
      <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-200/30 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <WorkspaceNavbar />

        <WorkspaceHeader />

        <WorkspaceGrid />
      </div>
    </main>
  );
}

export default WorkspacePage;