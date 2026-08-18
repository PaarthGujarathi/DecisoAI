import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function WorkspaceHeader() {
  return (
    <section className="mx-auto mb-10 max-w-4xl text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/60 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs">
          <Sparkles size={14} className="text-blue-600" />
          DecisioAI Application Launcher
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
      >
        Choose your workspace
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mx-auto mt-3 max-w-xl text-base text-slate-500"
      >
        Select a tool to continue working. Explore predictive models, AI decision guidance, and automated reports.
      </motion.p>
    </section>
  );
}

export default WorkspaceHeader;