import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

function WorkspaceHeader() {
  return (
    <section className="mb-20">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
          <Sparkles size={16} />
          AI Powered Workspace
        </div>
      </div>

      {/* Heading */}
      <div className="mx-auto mt-8 max-w-4xl text-center">
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
          Choose Your
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
            {" "}
            Workspace
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600">
          Everything you need to analyse data, forecast trends,
          generate AI insights, simulate business decisions,
          and produce professional reports.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <TrendingUp
            className="mb-3 text-blue-600"
            size={28}
          />

          <h3 className="text-lg font-semibold text-slate-900">
            Predict Business Growth
          </h3>

          <p className="mt-2 text-slate-500">
            Forecast future sales, revenue and demand using
            machine learning models.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <BrainCircuit
            className="mb-3 text-violet-600"
            size={28}
          />

          <h3 className="text-lg font-semibold text-slate-900">
            AI Decision Support
          </h3>

          <p className="mt-2 text-slate-500">
            Receive intelligent recommendations generated
            specifically for your business data.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ArrowRight
            className="mb-3 text-emerald-600"
            size={28}
          />

          <h3 className="text-lg font-semibold text-slate-900">
            One Click Navigation
          </h3>

          <p className="mt-2 text-slate-500">
            Select any module below to immediately start
            working inside DecisioAI.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceHeader;