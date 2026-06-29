"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // IMPORTED LINK
import { Compass, Building2, FileCheck, Briefcase, Award, Home, ArrowRight, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Building2,
  FileCheck,
  Briefcase,
  Award,
  Home,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            End-to-End <span className="serif-highlight text-amber-600 font-medium">Educational Support</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            From career discovery to placement support, we guide you through every step of your educational journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Compass;
            const isPopular = service.id === 'career-counseling' || service.id === 'college-admissions';
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl glass-card border border-white/60 shadow-lg shadow-slate-200/40 hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-4 right-4 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-amber-400">
                    Recommended
                  </div>
                )}
                
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={`/services/${service.id}`} 
                  className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-3 transition-all duration-300 pt-4 border-t border-slate-100"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}