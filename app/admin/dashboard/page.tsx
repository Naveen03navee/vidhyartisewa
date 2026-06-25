"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, BookOpen, GraduationCap, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-client";

export default function AdminDashboardHome() {
  const [counts, setCounts] = useState({
    colleges: 0,
    courses: 0,
    blogs: 12,          // Still hardcoded until you build the blogs logic
    successStories: 0   // Changed from 'testimonials' and set to 0 for live fetching
  });

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient(); 

      try {
        const { count: coursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
        const { count: collegesCount } = await supabase.from('colleges').select('*', { count: 'exact', head: true });
        
        // NEW: Fetching the live count of success stories from your database
        const { count: storiesCount } = await supabase.from('success_stories').select('*', { count: 'exact', head: true });

        setCounts(prev => ({
          ...prev,
          courses: coursesCount || 0,
          colleges: collegesCount || 0,
          successStories: storiesCount || 0 // Updating state with real number
        }));
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    }

    fetchCounts();
  }, []);

  const stats = [
    { title: "Total Colleges", value: counts.colleges, icon: Building2, bgClass: "bg-blue-50", textClass: "text-blue-500", link: "/admin/dashboard/colleges" },
    { title: "Active Courses", value: counts.courses, icon: GraduationCap, bgClass: "bg-emerald-50", textClass: "text-emerald-500", link: "/admin/dashboard/courses" },
    { title: "Blog Posts", value: counts.blogs, icon: BookOpen, bgClass: "bg-amber-50", textClass: "text-amber-500", link: "/admin/dashboard/blogs" },
    
    // UPDATED: Now points to success stories with the correct link and label
    { title: "Success Stories", value: counts.successStories, icon: Users, bgClass: "bg-rose-50", textClass: "text-rose-500", link: "/admin/dashboard/success-stories" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6138]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8">
            This is your control center. Here you can manage your partner colleges, publish new blog posts, and update your success stories without touching a single line of code.
          </p>
          <div className="flex gap-4">
            <Link href="/admin/dashboard/colleges">
              <Button className="bg-[#FF6138] hover:bg-[#E5502B] text-white rounded-xl font-bold h-12 px-6">
                Manage Colleges
              </Button>
            </Link>
            <Link href="/" target="_blank">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl font-bold h-12 px-6 backdrop-blur-sm">
                View Live Website
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-slate-400" />
          Database Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link key={stat.title} href={stat.link}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.textClass}`} />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500">{stat.title}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}