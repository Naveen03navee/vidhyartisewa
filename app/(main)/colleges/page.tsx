"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, Star, MapPin, GraduationCap, Filter, 
  ArrowRight, Search, CheckCircle, TrendingUp, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PARTNER_COLLEGES, COLLEGE_CATEGORIES } from "@/lib/data";

export default function CollegesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColleges = PARTNER_COLLEGES.filter(college => {
    const matchesCategory = activeCategory === "All" || 
      college.type.toLowerCase().includes(activeCategory.toLowerCase()) ||
      college.courses.some(c => c.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Building2 className="w-4 h-4" />
              Partner Institutions
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              500+ Partner Colleges Across Karnataka
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From top Engineering institutes to renowned Medical colleges, 
              we have partnerships that open doors to your future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search colleges by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {COLLEGE_CATEGORIES.map(cat => (
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
        </div>
      </section>

      {/* College Grid */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-amber-50 group-hover:to-amber-100 transition-all">
                      <Building2 className="w-7 h-7 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-amber-700">{college.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {college.location}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">{college.type}</Badge>
                    <Badge variant="outline" className="text-xs">Est. {college.established}</Badge>
                  </div>

                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {college.description}
                  </p>

                  {/* Courses */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {college.courses.slice(0, 3).map(course => (
                      <span key={course} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="text-xs text-slate-400">+{college.courses.length - 3} more</span>
                    )}
                  </div>

                  {/* Placement Stats */}
                  <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-slate-400">Avg Package</span>
                        <div className="font-bold text-slate-900">{college.placement_stats.average_package}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Placement</span>
                        <div className="font-bold text-emerald-600">{college.placement_stats.placement_rate}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => { const el = document.getElementById("counseling-form"); el?.scrollIntoView({ behavior: "smooth" }); }}>
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-400">No colleges found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Partner Colleges */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Our Partner Colleges?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We carefully select colleges based on strict quality criteria to ensure the best for our students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: "Verified Accreditation", desc: "All colleges are UGC/AICTE/MCI approved" },
              { icon: TrendingUp, title: "Strong Placements", desc: "Minimum 70% placement rate required" },
              { icon: Users, title: "Quality Faculty", desc: "Experienced and qualified teaching staff" },
              { icon: GraduationCap, title: "Modern Infrastructure", desc: "State-of-the-art labs and facilities" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
