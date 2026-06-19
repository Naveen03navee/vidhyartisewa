"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, Clock, GraduationCap, IndianRupee, ArrowRight, 
  Search, Briefcase, TrendingUp, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { COURSES, COURSE_CATEGORIES } from "@/lib/data";

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 gradient-bg overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Courses
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Find Your Perfect Course
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Explore courses across Engineering, Medical, Nursing, Management & more 
              with detailed information on eligibility, fees, and career prospects.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder:text-white/50 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {COURSE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="blue" className="text-xs">{course.category}</Badge>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>Eligibility: {course.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <IndianRupee className="w-4 h-4 text-emerald-500" />
                      <span>Fees: {course.fees_range}</span>
                    </div>
                  </div>

                  {/* Salary Insights */}
                  <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <div className="text-xs text-slate-400 mb-2">Salary Insights (LPA)</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 mb-1">Entry</div>
                        <div className="h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-medium text-blue-700">
                          {course.salary_insights.entry}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 mb-1">Mid</div>
                        <div className="h-6 bg-amber-100 rounded flex items-center justify-center text-xs font-medium text-amber-700">
                          {course.salary_insights.mid}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 mb-1">Senior</div>
                        <div className="h-6 bg-emerald-100 rounded flex items-center justify-center text-xs font-medium text-emerald-700">
                          {course.salary_insights.senior}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Career Opportunities */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-400 mb-2">Top Careers:</div>
                    <div className="flex flex-wrap gap-1">
                      {course.career_opportunities.slice(0, 3).map(career => (
                        <span key={career} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Partner Colleges */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-400 mb-2">Partner Colleges:</div>
                    <div className="text-xs text-slate-600">
                      {course.partner_colleges.slice(0, 2).join(", ")}
                      {course.partner_colleges.length > 2 && ` +${course.partner_colleges.length - 2} more`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => { const el = document.getElementById("counseling-form"); el?.scrollIntoView({ behavior: "smooth" }); }}>
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Download Brochure
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-400">No courses found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
