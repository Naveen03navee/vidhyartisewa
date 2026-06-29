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
    <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Background Grids & Radial Glow Spots */}
      <div className="absolute inset-0 bg-grid-pattern-white opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-sm font-semibold mb-4 backdrop-blur-sm border border-white/5 shadow-sm">
            <Route className="w-4 h-4" />
            Your Journey
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Your <span className="serif-highlight text-amber-400 font-medium">Career Roadmap</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            A clear, tailored path from initial confusion to career success. We guide you through every step.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-amber-500/10 via-amber-500/60 to-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />

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
                  className="relative group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step number circle */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-[3px] border-slate-900">
                      <Icon className="w-8 h-8 text-slate-950" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-950 text-[10px] font-bold text-amber-400 flex items-center justify-center border border-white/10">
                        0{step.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="glass-card-dark rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300 hover:bg-slate-900/50 shadow-xl flex-1 flex flex-col justify-between w-full h-full min-h-[180px] hover:shadow-2xl hover:shadow-amber-500/5">
                      <div>
                        <div className="text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2">
                          Step {step.step}
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
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
