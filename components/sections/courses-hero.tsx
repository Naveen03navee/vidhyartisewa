"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Code, HeartPulse, Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COURSES } from "@/lib/data";

interface CoursesHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function CoursesHero({ searchQuery, setSearchQuery }: CoursesHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Generate top 4 suggestions based on input
  const suggestions = COURSES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  const selectSuggestion = (courseName: string) => {
    setSearchQuery(courseName);
    setIsFocused(false);
    
    // Scroll only when a suggestion is clicked
    const grid = document.getElementById("courses-grid");
    if (grid) {
      const y = grid.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const floatingTags = [
    { text: "B.Tech CSE", icon: Code, top: "20%", left: "5%" },
    { text: "MBBS", icon: HeartPulse, top: "60%", left: "10%" },
    { text: "MBA Finance", icon: Briefcase, top: "30%", right: "5%" },
    { text: "B.Sc Nursing", icon: HeartPulse, top: "70%", right: "10%" },
  ];

 return (
    // Updated background to deep steel-blue
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#3a506b]">
      
      {/* Deep steel blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#3a506b]/95 z-0 pointer-events-none" />

      {/* Animated Background Orbs - Toned down for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/30 rounded-full blur-[100px] -translate-y-1/3 -translate-x-1/3" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FDB813]/20 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3" 
        />
      </div>

      {/* Floating Elements Background - Updated to dark glassmorphism */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        {floatingTags.map((tag, i) => {
          const Icon = tag.icon;
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 + i, ease: "easeInOut" }}
              className="absolute bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
              style={{ top: tag.top, left: tag.left, right: tag.right }}
            >
              <div className="bg-[#FDB813]/20 p-2 rounded-lg text-[#FDB813]"><Icon className="w-5 h-5" /></div>
              <span className="font-bold text-white">{tag.text}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="container-custom relative z-20 text-center">
        {/* Top Floating Icon - Updated to solid gold */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-20 h-20 bg-[#FDB813] rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(253,184,19,0.4)] rotate-12"
        >
          <BookOpen className="w-10 h-10 text-slate-900 -rotate-12" />
        </motion.div>

        {/* Headings - Updated text colors */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
        >
          Find Your <span className="text-[#FDB813]">Calling</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }} 
          className="text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Browse comprehensive details, fee structures, and career trajectories for over 100+ professional degree programs.
        </motion.p>

        {/* LIVE SEARCH BAR WITH AUTOCOMPLETE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
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
              placeholder="Search for B.Tech, MBBS, MBA..."
              className="w-full bg-transparent border-none text-slate-900 px-4 py-4 focus:outline-none placeholder:text-slate-400 text-lg font-medium"
            />
            <button 
              onClick={() => {
                const grid = document.getElementById("courses-grid");
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
                        {/* Changed hover color to match gold */}
                        <div className="font-bold text-slate-900 group-hover:text-[#E5A300] transition-colors">{c.name}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <GraduationCap className="w-3 h-3" /> Eligibility: {c.eligibility}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">{c.category}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-slate-500 text-center">
                    No matching courses found for "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}