import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import AIAdvisor from "../../components/decision-intelligence/AIAdvisor";
import WhatIfSimulator from "../../components/decision-intelligence/WhatIfSimulator";

function SimulatorPage() {
  const [activeTab, setActiveTab] = useState<"advisor" | "simulator">(
    "simulator"
  );

  return (
    <div className="space-y-6">
      <Link
        to="/app/decision"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={14} />
        Back to Decision Hub
      </Link>

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Decision Intelligence
        </h1>

        <p className="mt-2 text-slate-500">
          Use AI reasoning or simulate business scenarios to make smarter
          decisions.
        </p>
      </div>

      <div className="flex w-fit rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => setActiveTab("advisor")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
            activeTab === "advisor"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          AI Advisor
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
            activeTab === "simulator"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          What-If Simulator
        </button>
      </div>

      {activeTab === "advisor" ? (
        <AIAdvisor />
      ) : (
        <WhatIfSimulator />
      )}
    </div>
  );
}

export default SimulatorPage;