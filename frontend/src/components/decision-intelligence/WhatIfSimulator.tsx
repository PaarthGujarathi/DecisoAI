import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Play,
  TrendingUp,
} from "lucide-react";
import {
  simulateWhatIf,
  type WhatIfResponse,
} from "../../services/mlApi";

function WhatIfSimulator() {
  const [form, setForm] = useState({
    product: "Laptop",
    category: "Electronics",
    current_cost: 520,
    current_price: 850,
    proposed_cost: 520,
    proposed_price: 900,
    region: "West",
    month: "2025-12",
  });

  const [result, setResult] = useState<WhatIfResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await simulateWhatIf(form);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to run the simulation. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "text-xs font-bold uppercase tracking-wide text-slate-500";

  return (
    <div className="space-y-6">

      {/* Simulator Form */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-6 md:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <TrendingUp size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                What-If Simulator
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Compare your current business decision against a proposed
                scenario using the demand prediction model.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">

          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900">
              Decision Inputs
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Enter the current situation and the scenario you want to test.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Product */}
            <div>
              <label className={labelClass}>
                Product
              </label>

              <input
                value={form.product}
                onChange={(e) =>
                  updateField("product", e.target.value)
                }
                className={inputClass}
                placeholder="e.g. Laptop"
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>
                Category
              </label>

              <input
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                className={inputClass}
                placeholder="e.g. Electronics"
              />
            </div>

            {/* Current Cost */}
            <div>
              <label className={labelClass}>
                Current Cost
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={form.current_cost}
                  onChange={(e) =>
                    updateField(
                      "current_cost",
                      Number(e.target.value)
                    )
                  }
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* Current Price */}
            <div>
              <label className={labelClass}>
                Current Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={form.current_price}
                  onChange={(e) =>
                    updateField(
                      "current_price",
                      Number(e.target.value)
                    )
                  }
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="md:col-span-2">
              <div className="my-2 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Proposed Scenario
                </span>

                <div className="h-px flex-1 bg-slate-100" />
              </div>
            </div>

            {/* Proposed Cost */}
            <div>
              <label className={labelClass}>
                Proposed Cost
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={form.proposed_cost}
                  onChange={(e) =>
                    updateField(
                      "proposed_cost",
                      Number(e.target.value)
                    )
                  }
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* Proposed Price */}
            <div>
              <label className={labelClass}>
                Proposed Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={form.proposed_price}
                  onChange={(e) =>
                    updateField(
                      "proposed_price",
                      Number(e.target.value)
                    )
                  }
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className={labelClass}>
                Region
              </label>

              <input
                value={form.region}
                onChange={(e) =>
                  updateField("region", e.target.value)
                }
                className={inputClass}
                placeholder="e.g. West"
              />
            </div>

            {/* Month */}
            <div>
              <label className={labelClass}>
                Month
              </label>

              <input
                type="month"
                value={form.month}
                onChange={(e) =>
                  updateField("month", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
              <CircleAlert
                size={18}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <div>
                <p className="text-sm font-semibold text-red-700">
                  Simulation failed
                </p>

                <p className="mt-1 text-xs text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <Play size={16} />

              {loading
                ? "Running Simulation..."
                : "Run What-If Simulation"}

              {!loading && <ArrowRight size={16} />}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Result Header */}
          <div className="border-b border-slate-100 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Simulation Result
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {result.product}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  AI-powered scenario comparison
                </p>
              </div>

              <RecommendationBadge
                recommendation={result.recommendation}
              />
            </div>
          </div>

          {/* Main Metrics */}
          <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-4">

            <Metric
              label="Current Profit"
              value={`₹${result.current_profit.toLocaleString()}`}
            />

            <Metric
              label="Proposed Profit"
              value={`₹${result.proposed_profit.toLocaleString()}`}
              highlighted
            />

            <Metric
              label="Profit Change"
              value={`₹${result.profit_change.toLocaleString()}`}
              positive={result.profit_change > 0}
              negative={result.profit_change < 0}
            />

            <Metric
              label="Profit Change %"
              value={`${result.profit_change_percent}%`}
              positive={result.profit_change_percent > 0}
              negative={result.profit_change_percent < 0}
            />
          </div>

          {/* Recommendation */}
          <div className="px-6 pb-6 md:px-8">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Recommendation Reason
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {result.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="border-t border-slate-100 bg-slate-50/60 p-6 md:p-8">

            <div className="mb-5">
              <h3 className="text-sm font-bold text-slate-900">
                Demand & Revenue Impact
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Estimated effect of the proposed decision.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              <Metric
                label="Current Demand"
                value={`${result.current_quantity}`}
              />

              <Metric
                label="Proposed Demand"
                value={`${result.proposed_quantity}`}
              />

              <Metric
                label="Revenue Change"
                value={`₹${result.revenue_change.toLocaleString()}`}
                positive={result.revenue_change > 0}
                negative={result.revenue_change < 0}
              />

              <Metric
                label="Proposed Revenue"
                value={`₹${result.proposed_revenue.toLocaleString()}`}
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationBadge({
  recommendation,
}: {
  recommendation: string;
}) {
  const isRecommended = recommendation === "RECOMMENDED";
  const isNotRecommended = recommendation === "NOT RECOMMENDED";

  return (
    <div
      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
        isRecommended
          ? "bg-emerald-50 text-emerald-700"
          : isNotRecommended
            ? "bg-red-50 text-red-700"
            : "bg-slate-100 text-slate-700"
      }`}
    >
      {isRecommended && <CheckCircle2 size={15} />}

      {isNotRecommended && <CircleAlert size={15} />}

      {recommendation}
    </div>
  );
}

function Metric({
  label,
  value,
  positive,
  negative,
  highlighted,
}: {
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlighted
          ? "border-blue-100 bg-blue-50/50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-bold ${
          positive
            ? "text-emerald-600"
            : negative
              ? "text-red-600"
              : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default WhatIfSimulator;