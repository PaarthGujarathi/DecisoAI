import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, TrendingUp, Upload } from "lucide-react";
import { motion } from "framer-motion";
import BusinessDataScene from "./BusinessDataScene";

export default function Hero() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartAnalysing = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/workspace");
    }, 280);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080808] text-[#F5F5F5] select-none font-sans">
      {/* 3D Interactive Business Data Visualization Background */}
      <BusinessDataScene isTransitioning={isTransitioning} />

      {/* Subtle Dark Foreground Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(11,11,13,0.92)_40%,_transparent_75%)] z-0" />

      {/* Main Content Composition */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Hero Copy & Actions (55% width) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7"
          >
            {/* DecisioAI Brand Title */}
            <div className="mb-4 text-xs font-mono font-bold tracking-widest uppercase text-[#FF3B30]">
              DecisioAI &bull; Business Intelligence
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-6xl lg:text-7xl leading-none">
              Transform Business Data into{" "}
              <span className="bg-gradient-to-r from-[#E63946] via-[#FF3B30] to-[#E63946] bg-clip-text text-transparent">
                Intelligent Decisions
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9A9A9A]">
              DecisioAI brings your business data to life. Forecast sales, simulate strategic scenarios, receive AI recommendations, and generate professional reports—all in one intelligent platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleStartAnalysing}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#E63946] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-950/40 transition-all duration-200 hover:bg-[#FF3B30] hover:shadow-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#080808]"
              >
                <span>Start Analysing</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <a
                href="#features"
                className="rounded-xl border border-[#252529] bg-[#111214] px-8 py-4 text-base font-semibold text-[#F5F5F5] shadow-2xs transition-all duration-200 hover:bg-[#17181B] hover:border-slate-700"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Visualization Focal Window (45% width) */}
          <div className="hidden lg:col-span-5 lg:block h-full min-h-[380px] pointer-events-none">
            {/* Intentionally left open for 3D Business Data Terrain visualization */}
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div id="features" className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 shadow-2xs transition hover:border-[#E63946]/50">
            <Upload className="mb-3 text-emerald-400" size={26} />
            <h3 className="text-lg font-bold text-[#F5F5F5]">Smart Data Upload</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#9A9A9A]">
              Import CSV and Excel datasets securely for instant automated schema detection and analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 shadow-2xs transition hover:border-[#E63946]/50">
            <TrendingUp className="mb-3 text-amber-400" size={26} />
            <h3 className="text-lg font-bold text-[#F5F5F5]">Predictive Forecasting</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#9A9A9A]">
              Forecast future sales, revenue, and demand using machine learning time-series models.
            </p>
          </div>

          <div className="rounded-2xl border border-[#252529] bg-[#111214] p-6 shadow-2xs transition hover:border-[#E63946]/50">
            <BrainCircuit className="mb-3 text-[#FF3B30]" size={26} />
            <h3 className="text-lg font-bold text-[#F5F5F5]">AI Decision Support</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#9A9A9A]">
              Receive actionable recommendations powered by Google Gemini generative business models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

