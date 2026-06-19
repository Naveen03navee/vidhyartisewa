"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Building2, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-3xl"
        />  
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-white/90">
              Trusted by 10,000+ Students Across Karnataka
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Shape Your Future with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
              Expert Career Guidance
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Vidhyarthi Sewa has guided 10,000+ students across Karnataka. We help you choose the right 
            college and build a successful career through personalized counseling and 
            end-to-end admission support.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="xl"
              className="pulse-glow text-lg"
              onClick={() => {
                const el = document.getElementById("counseling-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Free Counseling
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="xl"
              variant="glass"
              className="text-lg"
              onClick={() => {
                const el = document.getElementById("courses");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Courses
            </Button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { icon: Star, label: "4.9/5 Rating" },
              { icon: Users, label: "10,000+ Students" },
              { icon: Building2, label: "500+ Colleges" },
              { icon: TrendingUp, label: "98% Success Rate" },
              { icon: Award, label: "15+ Years" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60">
                <item.icon className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

      {/* Optional: Background image overlay - uncomment when you add hero-bg.jpg */}
      {/*
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      />
      */}
    </section>
  );
}