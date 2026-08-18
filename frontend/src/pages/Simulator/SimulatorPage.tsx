import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function SimulatorPage() {
  return (
    <div className="space-y-6">
      <Link
        to="/app/decision"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={14} />
        Back to Decision Hub
      </Link>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xs">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">What-If Scenario Simulator</h1>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500">
            Interactive scenario modeling engine. Test parameters such as marketing spend, unit pricing, inventory levels, and workforce allocation to project expected revenue and margin impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SimulatorPage;