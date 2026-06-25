"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Star, Quote, Trophy, GraduationCap, Building2, 
  TrendingUp, Award, Users, ArrowRight, User, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessHero } from "@/components/sections/success-hero";
import { createClient } from "@/lib/supabase-client";

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

const successMetrics = [
  { icon: Users, value: "10,000+", label: "Students Placed", color: "blue" },
  { icon: TrendingUp, value: "₹8.5 LPA", label: "Average Package", color: "emerald" },
  { icon: Building2, value: "500+", label: "Recruiting Companies", color: "amber" },
  { icon: Award, value: "98%", label: "Success Rate", color: "rose" },
];

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]); // Added state for recruiters
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live stories AND companies from Supabase
  useEffect(() => {
    async function fetchPageData() {
      const supabase = createClient();
      
      // 1. Fetch Success Stories
      const { data: storyData, error: storyError } = await supabase
        .from("success_stories")
        .select("*")
        .order("created_at", { ascending: false }); // Newest first
      
      if (storyError) console.error("Error fetching stories:", storyError);
      else setStories(storyData || []);

      // 2. Fetch Recruiters
      const { data: recruiterData, error: recruiterError } = await supabase
        .from("recruiters")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (recruiterError) console.error("Error fetching recruiters:", recruiterError);
      else setCompanies(recruiterData || []);

      setIsLoading(false);
    }
    
    fetchPageData();
  }, []);

  return (
    <div className="pt-20">
      
      {/* 1. HERO COMPONENT */}
      <SuccessHero />

      {/* 2. Success Metrics */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-5`}>
                  <metric.icon className={`w-7 h-7 text-${metric.color}-500`} />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm font-medium text-slate-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials (LIVE FROM DATABASE) */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Authentic testimonials from students who transformed their careers with our guidance.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#FF6138] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Loading success stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800">No stories found</h3>
              <p className="text-slate-500">Check back later for new student success stories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => {
                
                // Safely parse the placement JSON from the database
                let parsedPlacement = null;
                if (story.placement) {
                  try {
                    parsedPlacement = JSON.parse(story.placement);
                  } catch (e) {
                    console.error("Could not parse placement data", e);
                  }
                }

                const imageSource = story.image_url || `${SUPABASE_IMAGE_URL}/testimonials/${story.id}.jpg`;
                const rating = parseInt(story.rating) || 5; // Fallback to 5 stars if empty

                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                  >
                    <Quote className="w-10 h-10 text-amber-200 mb-6" />

                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8 flex-1 italic">
                      "{story.text}"
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden relative shrink-0 border-2 border-white shadow-sm">
                        <img 
                          src={imageSource} 
                          alt={story.name}
                          className="w-full h-full object-cover relative z-10"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                          }}
                        />
                        <User className="w-6 h-6 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fallback-icon hidden" />
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">{story.name}</div>
                        <div className="text-sm font-medium text-slate-500">
                          {story.course} • {story.college}
                        </div>
                      </div>
                    </div>

                    {parsedPlacement && parsedPlacement.company && (
                      <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                        <Trophy className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium text-emerald-800">
                          Placed at <strong className="font-black text-emerald-900">{parsedPlacement.company}</strong> 
                          {parsedPlacement.package && ` — ${parsedPlacement.package}`}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. Admission Results */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Admission Results 2023-24
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              A snapshot of our students' admission achievements this year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { course: "Engineering", count: "2,500+", colleges: "150+ Engineering Colleges", color: "blue" },
              { course: "Medical", count: "800+", colleges: "50+ Medical Colleges", color: "emerald" },
              { course: "Nursing", count: "1,200+", colleges: "80+ Nursing Colleges", color: "rose" },
              { course: "Management", count: "1,500+", colleges: "100+ B-Schools", color: "amber" },
            ].map((item, index) => (
              <motion.div
                key={item.course}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center hover:shadow-lg transition-all"
              >
                <div className={`text-5xl font-black text-${item.color}-600 mb-3 tracking-tighter`}>{item.count}</div>
                <div className="font-bold text-slate-900 mb-2 text-lg">{item.course}</div>
                <div className="text-sm font-medium text-slate-500">{item.colleges}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Top Recruiters (DYNAMIC FROM DATABASE) */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Top Recruiting Companies
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our students are placed at leading companies across industries.
            </p>
          </motion.div>

          {companies.length === 0 && !isLoading ? (
            <div className="text-center py-10">
              <p className="text-slate-500">No recruiters found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1 h-24 relative overflow-hidden"
                >
                  <img 
                    src={company.image_url} 
                    alt={`${company.name} Logo`}
                    className="max-w-[80%] max-h-[80%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // Fallback text if the database image is broken
                      target.parentElement!.innerHTML = `<span class="font-black text-xl text-slate-800 tracking-tight group-hover:text-[#FF6138] transition-colors">${company.name}</span>`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6138]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Be Our Next Success Story
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
              Join thousands of students who achieved their dreams with Vidhyarthi Sewa guidance.
            </p>
            
            <Link href="/#counseling-form">
              <Button size="lg" className="bg-[#FF6138] hover:bg-[#E5502B] text-white rounded-full px-8 h-14 text-lg font-bold shadow-[0_10px_30px_-10px_rgba(255,97,56,0.6)] hover:scale-105 transition-all duration-300">
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

          </motion.div>
        </div>
      </section>
    </div>
  );
}