"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2, CheckCircle, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PARTNER_COLLEGES } from "@/lib/data"; 

interface CollegesHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function CollegesHero({ searchQuery, setSearchQuery }: CollegesHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Generate top 4 suggestions based on input
  const suggestions = PARTNER_COLLEGES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 4);

  const selectSuggestion = (collegeName: string) => {
    setSearchQuery(collegeName);
    setIsFocused(false);
    
    // Scroll only when a suggestion is clicked
    const grid = document.getElementById("college-grid");
    if (grid) {
      const y = grid.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    // Updated background to deep steel-blue
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#3a506b]">
      
      {/* Deep steel blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#3a506b]/95 z-0 pointer-events-none" />

      {/* Background orbs - Toned down for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-400/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FDB813]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" 
        />
      </div>

      {/* Floating Glass UI Elements - Updated to dark glassmorphism */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
          className="absolute top-[20%] left-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300"><CheckCircle className="w-5 h-5"/></div>
          <div>
            <p className="text-sm font-bold text-white">UGC Approved</p>
            <p className="text-xs text-slate-300">100% Verified</p>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} 
          className="absolute top-[35%] right-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-[#FDB813]/20 p-2 rounded-lg text-[#FDB813]"><Star className="w-5 h-5 fill-[#FDB813]"/></div>
          <div>
            <p className="text-sm font-bold text-white">Top Rated</p>
            <p className="text-xs text-slate-300">Institutions</p>
          </div>
        </motion.div>
      </div>

      <div className="container-custom relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top Badge - Updated to transparent glass with gold text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 shadow-sm text-[#FDB813] font-bold mb-8 backdrop-blur-md"
          >
            <Building2 className="w-4 h-4" /> 500+ Partner Institutions
          </motion.div>

          {/* Headings - Updated text colors */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Discover Your <span className="text-[#FDB813]">Dream Campus</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-lg lg:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Search through Karnataka's most prestigious engineering, medical, and management colleges. Find exactly what you're looking for instantly.
          </motion.p>

          {/* LIVE SEARCH BAR WITH AUTOCOMPLETE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className="relative max-w-3xl mx-auto z-[100]"
          >
            {/* Changed glow to gold */}
            <div className="absolute inset-0 bg-[#FDB813]/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
            
            <div className="relative flex items-center bg-white border-2 border-white rounded-full p-2 shadow-2xl">
              <Search className="w-7 h-7 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a college name, city, or course..."
                className="w-full bg-transparent border-none text-slate-900 px-4 py-4 focus:outline-none placeholder:text-slate-400 text-lg font-medium"
              />
              <button 
                onClick={() => {
                  const grid = document.getElementById("college-grid");
                  if (grid) {
                    const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                // Updated button to solid gold
                className="bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 px-8 py-4 rounded-full font-bold shadow-md shrink-0 hidden sm:block hover:scale-105 transition-transform"
              >
                Search
              </button>
            </div>

            {/* Smart Suggestions Dropdown */}
            <AnimatePresence>
              {isFocused && searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-left"
                >
                  {suggestions.length > 0 ? (
                    suggestions.map((c) => (
                      <div 
                        key={c.id} 
                        onClick={() => selectSuggestion(c.name)}
                        className="px-6 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex justify-between items-center group"
                      >
                        <div>
                          {/* Changed hover text color to gold */}
                          <div className="font-bold text-slate-900 group-hover:text-[#E5A300] transition-colors">{c.name}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {c.location}
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100">{c.type}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-slate-500 text-center">
                      No matching colleges found for "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}