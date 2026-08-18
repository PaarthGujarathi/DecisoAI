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
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A9A9A] transition hover:text-[#FF3B30]"
      >
        <ArrowLeft size={14} />
        Back to Decision Hub
      </Link>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-[#252529] bg-[#111214] p-8 shadow-2xs"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#FF3B30]">
          <BrainCircuit size={16} />
          <span>AI Decision Assistant</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
          Decision Guide
        </h1>

        <p className="mt-1 max-w-2xl text-xs text-[#9A9A9A]">
          Describe a business decision or operational dilemma. Our AI engine will analyze constraints, evaluate trade-offs, and recommend structured actions.
        </p>

        {/* Input Form Area */}
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="problem-input"
              className="block text-xs font-semibold text-[#F5F5F5]"
            >
              Describe your business decision problem
            </label>
            <textarea
              id="problem-input"
              rows={5}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. Should we increase our digital marketing spending by 25% next quarter or expand our regional sales workforce?"
              className="mt-2 w-full rounded-xl border border-[#252529] bg-[#17181B] p-4 text-xs text-[#F5F5F5] outline-none transition placeholder:text-slate-600 focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946]/40"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Powered by Google Gemini Decision Analytics
            </span>

            <button
              disabled={!problemDescription.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E63946] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#FF3B30] disabled:opacity-50"
            >
              <Send size={14} />
              Analyze Decision
            </button>
          </div>
        </div>
      </motion.div>

      {/* Suggested Scenarios */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
          <Sparkles className="mb-2 text-[#FF3B30]" size={18} />
          <h3 className="text-xs font-bold text-[#F5F5F5]">Pricing Optimization</h3>
          <p className="mt-1 text-[11px] text-[#9A9A9A]">
            Evaluate price elasticity and margin trade-offs before updating SaaS tier pricing.
          </p>
        </div>

        <div className="rounded-xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
          <Sparkles className="mb-2 text-violet-400" size={18} />
          <h3 className="text-xs font-bold text-[#F5F5F5]">Capacity Expansion</h3>
          <p className="mt-1 text-[11px] text-[#9A9A9A]">
            Determine optimal timing for expanding fulfillment centers based on projected growth.
          </p>
        </div>

        <div className="rounded-xl border border-[#252529] bg-[#111214] p-5 shadow-2xs">
          <Sparkles className="mb-2 text-emerald-400" size={18} />
          <h3 className="text-xs font-bold text-[#F5F5F5]">Budget Allocation</h3>
          <p className="mt-1 text-[11px] text-[#9A9A9A]">
            Compare customer acquisition ROI across search, social, and direct channels.
          </p>
        </div>
      </section>
    </div>
  );
}
