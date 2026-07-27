import { ArrowRight, BrainCircuit, TrendingUp, Upload } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6">
        <span className="mb-6 inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          AI Powered Business Intelligence
        </span>

        <h1 className="max-w-4xl text-6xl font-black leading-tight tracking-tight md:text-7xl">
          Transform Business Data into{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Intelligent Decisions
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
          DecisioAI helps businesses analyse data, forecast future trends,
          generate AI-powered insights, simulate strategic decisions, and create
          professional reports—all in one intelligent platform.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">
          <Link
            to="/workspace"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700"
          >
            Start Analysing
            <ArrowRight size={20} />
          </Link>

          <button className="rounded-xl border border-slate-700 px-8 py-4 text-lg transition hover:bg-slate-800">
            Learn More
          </button>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-white/5 p-6 backdrop-blur-lg">
            <Upload className="mb-4 text-blue-400" size={32} />
            <h3 className="text-xl font-semibold">Smart Data Upload</h3>
            <p className="mt-2 text-slate-400">
              Upload CSV and Excel datasets securely for instant AI analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-white/5 p-6 backdrop-blur-lg">
            <TrendingUp className="mb-4 text-emerald-400" size={32} />
            <h3 className="text-xl font-semibold">Predictive Forecasting</h3>
            <p className="mt-2 text-slate-400">
              Forecast future sales, demand, and revenue using machine learning.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-white/5 p-6 backdrop-blur-lg">
            <BrainCircuit className="mb-4 text-violet-400" size={32} />
            <h3 className="text-xl font-semibold">AI Insights</h3>
            <p className="mt-2 text-slate-400">
              Receive actionable recommendations powered by generative AI.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;