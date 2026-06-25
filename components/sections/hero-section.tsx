"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Building, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

export function HeroSection() {
  return (
    // Changed base background color
    <section className="relative min-h-screen bg-[#3a506b] overflow-hidden flex flex-col justify-center pt-32 pb-16">
      
      {/* Background Images */}
      <div 
        className="absolute inset-0 z-0 opacity-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${SUPABASE_IMAGE_URL}/hero/hero-bg.jpg')` }} 
      />
      
      {/* Deep steel blue gradient overlay that fades lighter at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#e2e8f0]/95 z-0" />

      <div className="container mx-auto px-4 relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Top Trust Badge - Updated for dark background */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full mb-8 lg:mb-12 shadow-sm"
        >
          <Star className="w-4 h-4 text-[#FDB813] fill-[#FDB813]" />
          <span className="text-sm font-semibold text-white">Trusted by 10,000+ Students Across Karnataka</span>
        </motion.div>

        <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Floating Image (Students) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center xl:justify-end items-start h-full pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -15, 0] }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }}
              className="w-[200px] xl:w-[260px] h-[260px] xl:h-[320px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/40 border-[6px] border-white/90 flex-shrink-0"
            >
              <img 
                src={`${SUPABASE_IMAGE_URL}/hero/students-laptop.jpg`} 
                alt="Students counseling" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Center Column: Main Text & Buttons */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center px-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-5xl xl:text-[4rem] leading-[1.2] md:leading-[1.1] font-black text-white mb-6 tracking-tight"
            >
              Shape Your Future with <br className="hidden sm:block"/>
              {/* Changed to solid gold to match screenshot */}
              <span className="text-[#FDB813]">Expert Career Guidance</span>
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
                  className="w-full bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 rounded-full px-8 h-14 text-base font-bold transition-all shadow-[0_10px_30px_-10px_rgba(253,184,19,0.5)] hover:scale-105"
                >
                  Book Free Counseling <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                {/* Updated to translucent glass effect */}
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full px-8 h-14 text-base font-bold transition-all shadow-sm"
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Floating Image (Campus) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center xl:justify-start items-end h-full pb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, 15, 0] }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.3 }
              }}
              className="w-[220px] xl:w-[280px] h-[160px] xl:h-[200px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/40 border-[6px] border-white/90 flex-shrink-0"
            >
              <img 
                src={`${SUPABASE_IMAGE_URL}/hero/campus-aerial.jpg`} 
                alt="College Campus" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
        </div>

        {/* Bottom Stats Row - Updated to match transparent style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-5xl mx-auto mt-auto"
        >
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 text-slate-100 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FDB813]" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FDB813]" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#FDB813]" />
              <span>500+ Colleges</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FDB813]" />
              <span>98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <Award className="w-4 h-4 text-[#FDB813]" />
              <span>15+ Years</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}