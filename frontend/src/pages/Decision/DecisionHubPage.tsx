import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const decisionCards = [
  {
    id: "what-if",
    title: "What-If Simulator",
    description:
      "Test different business scenarios by changing variables such as revenue, marketing budget, pricing, workforce, or demand and compare projected outcomes.",
    ctaLabel: "Launch Simulator",
    ctaTo: "/app/decision/what-if",
    icon: FlaskConical,
    badge: "Scenario Modeling",
  },
  {
    id: "guide",
    title: "Decision Guide",
    description:
      "Describe a complex business problem and receive AI-powered strategic recommendations and decision support based on available insights.",
    ctaLabel: "Open Decision Guide",
    ctaTo: "/app/decision/guide",
    icon: Lightbulb,
    badge: "AI Decision Support",
  },
];

export default function DecisionHubPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xs"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
          <Sparkles size={16} />
          <span>DecisioAI Decision Intelligence</span>
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Turn strategy into confident action
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          Explore scenario simulations or leverage generative AI guidance to make data-backed high-stakes business decisions.
        </p>
      </motion.section>

      {/* Cards Grid */}
      <section className="grid gap-6 md:grid-cols-2">
        {decisionCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Link
                to={card.ctaTo}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                      <Icon size={24} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                    {card.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-blue-600">
                  <span>{card.ctaLabel}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
