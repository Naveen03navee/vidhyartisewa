"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardCheck, ListChecks, FileCheck, CheckCircle, HeartHandshake, Workflow } from "lucide-react";
import { ADMISSION_STEPS } from "@/lib/data";

const iconMap: Record<number, React.ElementType> = {
  1: Phone,
  2: ClipboardCheck,
  3: ListChecks,
  4: FileCheck,
  5: CheckCircle,
  6: HeartHandshake,
};

export function AdmissionProcessSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50/40 relative overflow-hidden">
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-4 border border-purple-100 shadow-sm">
            <Workflow className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Our <span className="serif-highlight text-amber-600 font-medium">Admission Process</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            A simple, transparent process designed to get you admitted to your dream college.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical Line - Desktop Neon Line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 lg:-translate-x-1/2 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />

            {ADMISSION_STEPS.map((step, index) => {
              const Icon = iconMap[step.step] || Phone;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 lg:gap-0 mb-16 last:mb-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } group`}
                >
                  {/* Content Card Wrapper */}
                  <div className={`flex-1 lg:px-12 w-full`}>
                    <div className={`p-6 rounded-3xl glass-card border border-white/60 shadow-lg hover:shadow-2xl hover:border-amber-300/50 transition-all duration-300 hover:-translate-y-1 w-full lg:max-w-md ${isEven ? "lg:ml-auto" : "lg:mr-auto"}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold mb-3 border border-amber-100">
                        <span>Step 0{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Medal Node Circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0 group-hover:scale-110 transition-transform duration-300 border-[4px] border-slate-50">
                    <Icon className="w-5 h-5 text-slate-950" />
                  </div>

                  {/* Spacer for layout spacing */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
