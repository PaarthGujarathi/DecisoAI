import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BrainCircuit, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function DecisionGuidePage() {
  const [problemDescription, setProblemDescription] = useState("");

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/app/decision"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={14} />
        Back to Decision Hub
      </Link>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xs"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
          <BrainCircuit size={16} />
          <span>AI Decision Assistant</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Decision Guide
        </h1>

        <p className="mt-1 max-w-2xl text-xs text-slate-500">
          Describe a business decision or operational dilemma. Our AI engine will analyze constraints, evaluate trade-offs, and recommend structured actions.
        </p>

        {/* Input Form Area */}
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="problem-input"
              className="block text-xs font-semibold text-slate-700"
            >
              Describe your business decision problem
            </label>
            <textarea
              id="problem-input"
              rows={5}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. Should we increase our digital marketing spending by 25% next quarter or expand our regional sales workforce?"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Powered by Google Gemini Decision Analytics
            </span>

            <button
              disabled={!problemDescription.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={14} />
              Analyze Decision
            </button>
          </div>
        </div>
      </motion.div>

      {/* Suggested Scenarios */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <Sparkles className="mb-2 text-blue-600" size={18} />
          <h3 className="text-xs font-bold text-slate-900">Pricing Optimization</h3>
          <p className="mt-1 text-[11px] text-slate-500">
            Evaluate price elasticity and margin trade-offs before updating SaaS tier pricing.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <Sparkles className="mb-2 text-purple-600" size={18} />
          <h3 className="text-xs font-bold text-slate-900">Capacity Expansion</h3>
          <p className="mt-1 text-[11px] text-slate-500">
            Determine optimal timing for expanding fulfillment centers based on projected growth.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <Sparkles className="mb-2 text-emerald-600" size={18} />
          <h3 className="text-xs font-bold text-slate-900">Budget Allocation</h3>
          <p className="mt-1 text-[11px] text-slate-500">
            Compare customer acquisition ROI across search, social, and direct channels.
          </p>
        </div>
      </section>
    </div>
  );
}
