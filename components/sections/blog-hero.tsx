"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, Sparkles, TrendingUp, BellRing, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data";

interface BlogHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function BlogHero({ searchQuery, setSearchQuery }: BlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Generate top 4 suggestions based on input
  const suggestions = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 4);

  const selectSuggestion = (postTitle: string) => {
    setSearchQuery(postTitle);
    setIsFocused(false);
    
    // Scroll only when a suggestion is clicked
    const grid = document.getElementById("blog-grid");
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

      {/* Floating Glass UI Elements - Updated to dark glassmorphism */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
          className="absolute top-[20%] left-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300"><TrendingUp className="w-5 h-5"/></div>
          <div>
            <p className="text-sm font-bold text-white">Trending Now</p>
            <p className="text-xs text-slate-300">Admissions 2024</p>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} 
          className="absolute top-[35%] right-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
        >
          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-300"><BellRing className="w-5 h-5"/></div>
          <div>
            <p className="text-sm font-bold text-white">Latest Updates</p>
            <p className="text-xs text-slate-300">Stay Informed</p>
          </div>
        </motion.div>
      </div>

      <div className="container-custom relative z-20 text-center">
        {/* Top Badge - Updated to transparent glass with gold text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 shadow-sm text-[#FDB813] font-bold mb-8 backdrop-blur-md"
        >
          <BookOpen className="w-4 h-4 text-[#FDB813]" />
          The Vidhyarthi Sewa Journal
        </motion.div>

        {/* Headings - Updated text colors */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
        >
          Insights for your <br className="hidden sm:block" />
          <span className="text-[#FDB813]">
            Educational Journey
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Expert advice, admission updates, study tips, and the latest news from the world of higher education in Karnataka.
        </motion.p>

        {/* LIVE SEARCH BAR WITH AUTOCOMPLETE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="relative max-w-3xl mx-auto z-[100]"
        >
          {/* Changed glow from orange to gold to match theme */}
          <div className="absolute inset-0 bg-[#FDB813]/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
          
          <div className="relative flex items-center bg-white border-2 border-white rounded-full p-2 shadow-2xl">
            <Search className="w-7 h-7 text-slate-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides, or keywords..."
              className="w-full bg-transparent border-none text-slate-900 px-4 py-4 focus:outline-none placeholder:text-slate-400 text-lg font-medium"
            />
            <button 
              onClick={() => {
                const grid = document.getElementById("blog-grid");
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
                  suggestions.map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => selectSuggestion(post.title)}
                      className="px-6 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex justify-between items-center group"
                    >
                      <div className="pr-4">
                        {/* Changed hover color to gold */}
                        <div className="font-bold text-slate-900 group-hover:text-[#E5A300] transition-colors line-clamp-1">{post.title}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <FileText className="w-3 h-3" /> {post.read_time}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 shrink-0">{post.category}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-slate-500 text-center">
                    No articles found matching "{searchQuery}"
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