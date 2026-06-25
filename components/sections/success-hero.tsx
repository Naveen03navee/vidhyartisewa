"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Users, Briefcase } from "lucide-react";

export function SuccessHero() {
  return (
    // Updated background to deep steel-blue with deep blue gradient overlay
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#3a506b] overflow-hidden">
      
      {/* Deep steel blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#3a506b]/95 z-0 pointer-events-none" />

      {/* Animated Background Orbs - Toned down for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDB813]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" 
        />
      </div>

      {/* Floating Glass Badges - Updated to dark glassmorphism style */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
          className="absolute top-[20%] left-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300"><Trophy className="w-5 h-5"/></div>
          <div>
            <p className="text-sm font-bold text-white">Highest Placements</p>
            <p className="text-xs text-slate-300">Record Breaking</p>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} 
          className="absolute top-[35%] right-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-[#FDB813]/20 p-2 rounded-lg text-[#FDB813]"><Users className="w-5 h-5"/></div>
          <div>
            <p className="text-sm font-bold text-white">10,000+ Alumni</p>
            <p className="text-xs text-slate-300">Across the Globe</p>
          </div>
        </motion.div>
      </div>

      <div className="container-custom relative z-10 text-center flex flex-col items-center">
        
        {/* Rating Pill - Updated for dark background with gold text and preserved gold stars */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#FDB813] fill-[#FDB813]" />
            ))}
          </div>
          <span className="text-[#FDB813] text-sm font-bold border-l border-slate-300/30 pl-2 ml-1">Rated 4.9/5 by Students</span>
        </motion.div>

        {/* Headings - Updated text colors (White headings, solid gold highlight) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
        >
          10,000+ Dreams <br className="hidden sm:block" />
          <span className="text-[#FDB813]">
            Turned Reality.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Don't just take our word for it. Read how we've helped students from across the country secure seats in India's most prestigious institutions.
        </motion.p>

        {/* Animated Avatar Group - Updated borders for dark mode and trophy icon to solid gold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mt-12 -space-x-4"
        >
          {[32, 44, 57, 68].map((imgId) => (
            <div key={imgId} className="w-16 h-16 rounded-full border-4 border-[#3a506b] bg-white flex items-center justify-center overflow-hidden relative shadow-xl z-0 hover:z-20 hover:scale-110 transition-transform cursor-pointer">
              <img src={`https://i.pravatar.cc/150?img=${imgId}`} alt="Student Avatar" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-16 h-16 rounded-full border-4 border-[#3a506b] bg-[#FDB813] flex items-center justify-center z-10 shadow-xl">
            <Trophy className="w-6 h-6 text-slate-900" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}