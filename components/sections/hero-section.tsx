"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Building, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#2c3d52] overflow-hidden flex flex-col justify-center pt-32 pb-16">
      
      {/* Background Images */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat mix-blend-overlay"
        style={{ backgroundImage: `url('${SUPABASE_IMAGE_URL}/hero/hero-bg.jpg')` }} 
      />
      
      {/* Background Grid Pattern & Radial Glow Spots */}
      <div className="absolute inset-0 bg-grid-pattern-white opacity-[0.06] z-0" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none z-0" />
      
      {/* Deep steel blue gradient overlay that fades lighter at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a4a]/95 via-[#2c3e5a]/90 to-[#e2e8f0]/95 z-0" />

      <div className="container mx-auto px-4 relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Top Trust Badge with Overlapping Avatars */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8 lg:mb-12 shadow-lg hover:bg-white/15 transition-all duration-300 group cursor-default"
        >
          <div className="flex -space-x-2.5">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
              alt="Student Avatar" 
              className="w-7 h-7 rounded-full border border-slate-800 object-cover" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" 
              alt="Student Avatar" 
              className="w-7 h-7 rounded-full border border-slate-800 object-cover" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
              alt="Student Avatar" 
              className="w-7 h-7 rounded-full border border-slate-800 object-cover" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white pr-1">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 text-[#FDB813] fill-[#FDB813] group-hover:scale-115 transition-transform duration-300" />
              <span className="ml-1 text-amber-300">4.9/5 Rating</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-slate-100">Trusted by 10,000+ Students</span>
          </div>
        </motion.div>

        <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Interactive Card (Students) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center xl:justify-end items-start h-full pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={{ 
                opacity: 1,
                y: [0, -12, 0],
                rotate: [-3, -4, -3]
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                scale: { duration: 0.3 }
              }}
              className="relative w-[200px] xl:w-[260px] h-[260px] xl:h-[320px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/50 border-[6px] border-white/95 flex-shrink-0 cursor-pointer group"
            >
              <img 
                src={`${SUPABASE_IMAGE_URL}/hero/students-laptop.jpg`} 
                alt="Students counseling" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] xl:text-xs font-bold text-white whitespace-nowrap">Counseling Active</span>
              </div>
            </motion.div>
          </div>

          {/* Center Column: Main Text & Buttons */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center px-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-5xl xl:text-[4rem] xl:leading-[1.15] font-black text-white mb-6 tracking-tight"
            >
              Shape Your Future with <br className="hidden sm:block"/>
              <span className="serif-highlight text-[#FDB813] font-medium">Expert Career Guidance</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Vidhyarthi Sewa has guided 10,000+ students across Karnataka. We help you choose the right college and build a successful career through personalized counseling and end-to-end admission support.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <Link href="/#counseling-form" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 rounded-full px-8 h-14 text-base font-bold transition-all shadow-[0_10px_30px_-10px_rgba(253,184,19,0.5)] hover:scale-105 active:scale-95"
                >
                  Book Free Counseling <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full px-8 h-14 text-base font-bold transition-all shadow-sm active:scale-95"
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Mobile/Tablet Image Cards (Only visible on screens smaller than lg) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex lg:hidden items-center justify-center gap-6 mt-12 w-full max-w-[480px] mx-auto px-2"
            >
              {/* Left Mobile Card */}
              <div className="relative w-1/2 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white/95 rotate-[-3deg] cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-300">
                <img 
                  src={`${SUPABASE_IMAGE_URL}/hero/students-laptop.jpg`} 
                  alt="Students counseling" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md px-2 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-bold text-white whitespace-nowrap">Counseling Active</span>
                </div>
              </div>

              {/* Right Mobile Card */}
              <div className="relative w-1/2 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white/95 rotate-[3deg] cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-300">
                <img 
                  src={`${SUPABASE_IMAGE_URL}/hero/campus-aerial.jpg`} 
                  alt="College Campus" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-amber-500/95 backdrop-blur-md px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-lg shadow-amber-500/10">
                  <Building className="w-3 h-3 text-slate-950" />
                  <span className="text-[9px] font-bold text-slate-950 whitespace-nowrap">500+ Colleges</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Card (Campus) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center xl:justify-start items-end h-full pb-10">
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 3 }}
              animate={{ 
                opacity: 1,
                y: [0, 12, 0],
                rotate: [3, 4, 3]
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.3 },
                rotate: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="relative w-[220px] xl:w-[280px] h-[160px] xl:h-[200px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/50 border-[6px] border-white/95 flex-shrink-0 cursor-pointer group"
            >
              <img 
                src={`${SUPABASE_IMAGE_URL}/hero/campus-aerial.jpg`} 
                alt="College Campus" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-amber-500/95 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20">
                <Building className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
                <span className="text-[10px] xl:text-xs font-bold text-slate-950 whitespace-nowrap">500+ Partner Colleges</span>
              </div>
            </motion.div>
          </div>
          
        </div>

        {/* Bottom Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-5xl mx-auto mt-auto"
        >
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 text-slate-100 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2 hover:text-[#FDB813] transition-colors duration-300">
              <Star className="w-4 h-4 text-[#FDB813] fill-[#FDB813]" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#FDB813] transition-colors duration-300">
              <Users className="w-4 h-4 text-[#FDB813]" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#FDB813] transition-colors duration-300">
              <Building className="w-4 h-4 text-[#FDB813]" />
              <span>500+ Colleges</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#FDB813] transition-colors duration-300">
              <TrendingUp className="w-4 h-4 text-[#FDB813]" />
              <span>98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex hover:text-[#FDB813] transition-colors duration-300">
              <Award className="w-4 h-4 text-[#FDB813]" />
              <span>15+ Years</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}