"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    // ADDED print:hidden HERE
    <section className="py-16 bg-white print:hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 rounded-3xl p-8 lg:p-12 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Still Confused About Your Career?
              </h2>
              <p className="text-white/70 max-w-xl">
                Talk to our expert counselors today. Get personalized guidance on course selection, college admission, and career planning — completely free!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button
                size="lg"
                className="pulse-glow text-lg"
                onClick={() => {
                  const el = document.getElementById("counseling-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Book Free Counseling
              </Button>
              <Button
                size="lg"
                variant="glass"
                className="text-lg"
                onClick={() => {
                  const el = document.getElementById("counseling-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Call Us Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}