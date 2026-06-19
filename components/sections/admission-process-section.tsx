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
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
            <Workflow className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Admission Process
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A simple, transparent process designed to get you admitted to your dream college.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 lg:-translate-x-1/2" />

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
                  className={`relative flex items-start gap-6 lg:gap-0 mb-12 last:mb-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 lg:px-12 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold mb-3 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                      <span>Step {step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Circle */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Spacer for alternating layout */}
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
