"use client";

import { motion } from "framer-motion";
import { PARTNER_COLLEGES } from "@/lib/data";
import { Building2 } from "lucide-react";

export function PartnerMarquee() {
  const colleges = [...PARTNER_COLLEGES, ...PARTNER_COLLEGES];

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Partner Institutions
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Leading Colleges
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We have partnerships with 500+ colleges across Karnataka, ensuring you get the best admission opportunities.
          </p>
        </motion.div>
      </div>

      <div className="marquee-container py-4">
        <div className="marquee-content">
          {colleges.map((college, index) => (
            <div
              key={`${college.id}-${index}`}
              className="inline-flex items-center gap-3 mx-6 px-6 py-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-amber-50 group-hover:to-amber-100 transition-all overflow-hidden">
                {/* Replace with real college logo when available */}
                <img 
                  src={`/images/colleges/${college.slug}.jpg`} 
                  alt={college.name}
                  className="w-full h-full object-cover hidden" 
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <Building2 className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <div>
                <div className="font-semibold text-slate-800 text-sm whitespace-nowrap">
                  {college.name}
                </div>
                <div className="text-xs text-slate-400">{college.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
