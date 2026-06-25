"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SubPageHeroProps {
  bgText: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function SubPageHero({ bgText, title, description, icon: Icon }: SubPageHeroProps) {
  return (
    // Updated background to deep steel-blue
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#3a506b] overflow-hidden">
      
      {/* Deep steel blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#3a506b]/95 z-0 pointer-events-none" />

      {/* Giant Background Text - Toned down for dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
        <h1 className="text-[clamp(4rem,12vw,10rem)] font-black text-white/5 leading-none tracking-tighter whitespace-nowrap">
          {bgText}
        </h1>
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Top Badge - Updated to transparent glass with gold text */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#FDB813] font-bold mb-6 shadow-sm border border-white/20">
            <Icon className="w-4 h-4" />
            Vidhyarthi Sewa
          </div>
          
          {/* Headings - Updated to white text */}
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {title}
          </h2>
          
          {/* Description - Updated text color and glass effect for dark background */}
          <p className="text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 font-medium">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}