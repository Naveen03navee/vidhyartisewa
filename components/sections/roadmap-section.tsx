"use client";

import { motion } from "framer-motion";
import { Search, Map, FileText, CheckCircle, TrendingUp, Route } from "lucide-react";
import { CAREER_ROADMAP_STEPS } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Map,
  FileText,
  CheckCircle,
  TrendingUp,
};

export function RoadmapSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-sm font-medium mb-4 backdrop-blur-sm">
            <Route className="w-4 h-4" />
            Your Journey
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Career Roadmap
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            A clear path from confusion to career success. We guide you through every step.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/50 to-amber-500/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {CAREER_ROADMAP_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step number circle */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:bg-white/10">
                      <div className="text-amber-400 text-sm font-bold mb-2">
                        Step {step.step}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
