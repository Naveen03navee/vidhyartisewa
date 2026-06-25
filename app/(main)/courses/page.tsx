"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Clock, GraduationCap, IndianRupee, ArrowRight, 
  Search, Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase-client"; // Ensure this path is correct
import { CoursesHero } from "@/components/sections/courses-hero";

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]); // New state for DB data
  const [categories, setCategories] = useState<string[]>(["All"]); // Dynamic categories
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("courses").select("*");
      if (data) {
        setCourses(data);
        // Create unique list of categories from the fetched data
        const uniqueCats = ["All", ...Array.from(new Set(data.map(c => c.category)))];
        setCategories(uniqueCats);
      }
    }
    fetchData();
  }, [supabase]);

  // Filters posts by category and active search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      
      {/* 1. HERO COMPONENT */}
      <CoursesHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* 2. Sticky Category Filter */}
      {searchQuery === "" && (
        <section className="py-4 bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm transition-all">
          <div className="container-custom">
            <div className="flex justify-center overflow-x-auto w-full pb-2 lg:pb-0 hide-scrollbar">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      const grid = document.getElementById("courses-grid");
                      if (grid) {
                        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-[#FF6138] text-white shadow-lg shadow-[#FF6138]/30"
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
      )}

      {/* 3. Courses Grid */}
      <section id="courses-grid" className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-700 font-bold px-3 py-1">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold text-sm bg-slate-50 px-3 py-1 rounded-lg">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {course.duration}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#FF6138] transition-colors leading-tight">
                    {course.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-6 line-clamp-2 h-10 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-3 mb-8 mt-auto bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="flex-1">Eligibility: <span className="font-bold text-slate-900">{course.eligibility}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="flex-1">Est. Fees: <span className="font-bold text-slate-900">{course.fees_range}</span></span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      size="default" 
                      className="flex-1 bg-[#FF6138] hover:bg-[#E5502B] text-white rounded-xl shadow-md font-bold" 
                      onClick={() => window.location.href = '/#counseling-form'}
                    >
                      Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    
                    <a 
                      href={`/brochure/${course.slug}`} 
                      className="flex-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="default" variant="outline" className="w-full rounded-xl hover:bg-slate-50 font-bold border-slate-200">
                        <Download className="w-4 h-4 mr-2 text-slate-400" /> Brochure
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-32">
              <h3 className="text-2xl font-black text-slate-900 mb-2">No courses found</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}