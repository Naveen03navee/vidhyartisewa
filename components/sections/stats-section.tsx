"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, TrendingUp, Award } from "lucide-react";

const stats = [
  { value: 10000, suffix: "+", label: "Students Guided", icon: Users },
  { value: 500, suffix: "+", label: "Partner Colleges", icon: Building2 },
  { value: 98, suffix: "%", label: "Admission Success", icon: TrendingUp },
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-slate-50/60 relative overflow-hidden">
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center p-8 rounded-3xl glass-card border border-white/70 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-amber-500/5 hover:border-amber-300/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default relative overflow-hidden"
            >
              {/* Inner card light sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300 shadow-inner">
                <stat.icon className="w-7 h-7 text-amber-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 font-sans tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
