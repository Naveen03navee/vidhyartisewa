"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, Star, MapPin, ArrowRight, Search, CheckCircle, TrendingUp, Users, GraduationCap, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COLLEGE_CATEGORIES } from "@/lib/data"; // Only keeping categories from dummy data
import { CollegesHero } from "@/components/sections/colleges-hero";
import { createClient } from "@/lib/supabase-client"; // IMPORTANT: Added Supabase client

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

export default function CollegesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // NEW: State to hold live database colleges
  const [colleges, setColleges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: Fetch live data from Supabase when page loads
  useEffect(() => {
    async function fetchLiveColleges() {
      const supabase = createClient();
      const { data, error } = await supabase.from("colleges").select("*").order("name");
      
      if (error) {
        console.error("Error fetching colleges:", error);
      } else {
        setColleges(data || []);
      }
      setIsLoading(false);
    }
    
    fetchLiveColleges();
  }, []);

  // UPDATED: Filter the live 'colleges' state instead of the static 'PARTNER_COLLEGES'
  const filteredColleges = colleges.filter(college => {
    const matchesCategory = activeCategory === "All" || 
      (college.type && college.type.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (college.courses && college.courses.some((c: string) => c.toLowerCase().includes(activeCategory.toLowerCase())));
    
    const matchesSearch = 
      (college.name && college.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (college.location && college.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (college.courses && college.courses.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase())));
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      
      {/* 1. HERO COMPONENT */}
      <CollegesHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 2. Sticky Category Filter - ONLY VISIBLE WHEN SEARCH IS EMPTY */}
      {searchQuery === "" && (
        <section className="py-4 bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm transition-all">
          <div className="container-custom">
            <div className="flex justify-center overflow-x-auto w-full pb-2 lg:pb-0 hide-scrollbar">
              <div className="flex gap-2">
                {COLLEGE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      const grid = document.getElementById("college-grid");
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

      {/* 3. College Grid */}
      <section id="college-grid" className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          
          {/* Show loading spinner while fetching from Supabase */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-[#FF6138] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Loading partner colleges...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college, index) => {
                  
                  const imageSource = college.image_url || `${SUPABASE_IMAGE_URL}/colleges/${college.slug}.jpg`;

                  return (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col"
                    >
                      <div className="p-6 pb-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-all overflow-hidden p-2 border border-slate-100">
                            
                            <img 
                              src={imageSource} 
                              alt={college.name}
                              className="w-full h-full object-contain mix-blend-multiply" 
                              onError={(e) => { 
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                              }}
                            />
                            <Building2 className="w-8 h-8 text-slate-300 group-hover:text-amber-500 transition-colors fallback-icon hidden" />
                          </div>

                          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-black text-amber-700">{college.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#FF6138] transition-colors leading-tight">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mb-4">
                          <MapPin className="w-4 h-4" />
                          {college.location}
                        </div>

                        <div className="flex items-center gap-2 mb-5">
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700">{college.type || "Institution"}</Badge>
                          <Badge variant="outline" className="text-slate-500">Est. {college.established || "N/A"}</Badge>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 mb-6">
                          {college.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                          {(college.courses || []).slice(0, 3).map((course: string) => (
                            <span key={course} className="text-xs font-bold bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100">
                              {course}
                            </span>
                          ))}
                          {(college.courses || []).length > 3 && (
                            <span className="text-xs font-bold text-slate-400 self-center px-2">+{(college.courses || []).length - 3} more</span>
                          )}
                        </div>

                        <div className="bg-slate-50/50 rounded-2xl p-4 mb-6 border border-slate-100">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Avg Package</span>
                              <div className="font-black text-slate-900 text-base">{college.placement_stats?.average_package || "TBA"}</div>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Placement</span>
                              <div className="font-black text-emerald-600 text-base">{college.placement_stats?.placement_rate || "TBA"}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link href="/#counseling-form" className="flex-1">
                            <Button size="default" className="w-full bg-[#FF6138] hover:bg-[#E5502B] text-white rounded-xl shadow-md">
                              Apply
                            </Button>
                          </Link>
                          <Link href={`/colleges/${college.slug}`} className="flex-1">
                            <Button size="default" variant="outline" className="w-full rounded-xl hover:bg-slate-50 font-bold border-slate-200">
                              Details <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filteredColleges.length === 0 && (
                <div className="text-center py-32">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No exact matches found</h3>
                  <p className="text-slate-500 text-lg">We could not find a college matching "{searchQuery}". Try a different keyword or category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4. Why Partner Colleges (Remains the same) */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
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
                className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 border border-slate-100">
                  <item.icon className="w-8 h-8 text-[#FF6138]" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}