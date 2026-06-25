"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Users, Shield, Award, Loader2, Quote } from "lucide-react";
import { SubPageHero } from "@/components/sections/subpage-hero";
import { createClient } from "@/lib/supabase-client";

const milestones = [
  { year: "2009", title: "Founded", description: "Started as a small counseling desk in Bangalore with a mission to help students find their path." },
  { year: "2012", title: "1,000 Students", description: "Reached our first milestone of guiding 1,000 students to their dream colleges." },
  { year: "2015", title: "Medical Expansion", description: "Expanded services to include Medical and Nursing admissions across Karnataka." },
  { year: "2018", title: "International Support", description: "Launched international student support services for NRI and foreign students." },
  { year: "2021", title: "10,000+ Milestone", description: "Celebrated guiding over 10,000 students to successful careers." },
  { year: "2024", title: "Digital Transformation", description: "Launched AI-powered career tools and digital platform for seamless student experience." },
];

const values = [
  { icon: Shield, title: "Integrity", description: "We believe in honest, transparent guidance with no hidden agendas." },
  { icon: Award, title: "Excellence", description: "Striving for the highest standards in every counseling session." },
  { icon: Users, title: "Student-First", description: "Every decision is made with the student's best interest at heart." },
  { icon: Heart, title: "Transparency", description: "Clear communication about processes, fees, and expectations." },
  { icon: Lightbulb, title: "Innovation", description: "Continuously evolving our methods with the latest educational trends." },
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("id", { ascending: true }); 
      
      if (error) {
        console.error("Error fetching team:", error);
      } else {
        setTeamMembers(data || []);
      }
      setIsLoading(false);
    }
    
    fetchTeam();
  }, []);

  // AUTOMATICALLY FIND THE CEO AND SEPARATE THE REST OF THE TEAM
  const ceo = teamMembers.find(member => 
    member.role && (member.role.toLowerCase().includes('ceo') || member.role.toLowerCase().includes('founder'))
  );
  
  const regularTeam = teamMembers.filter(member => member.id !== ceo?.id);

  return (
    <div className="pt-20">
      
      {/* 1. HERO */}
      <SubPageHero 
        bgText="Our Story" 
        title="Guiding Dreams Since 2009" 
        description="We believe every student deserves the right guidance to unlock their true potential and secure a seat in their dream institution."
        icon={Users}
      />

      {/* 2. TIMELINE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Over 15 years of transforming student lives through expert guidance and unwavering support.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FDB813]/30 via-[#FDB813] to-[#FDB813]/30 lg:-translate-x-1/2" />

              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 lg:gap-0 mb-12 last:mb-0 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 lg:px-12 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDB813]/10 text-[#c28c0e] text-sm font-bold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-500">{milestone.description}</p>
                    </div>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[#FDB813] flex items-center justify-center shadow-lg shadow-[#FDB813]/30 shrink-0">
                      <span className="text-slate-900 font-black text-sm">{milestone.year.slice(-2)}</span>
                    </div>
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VALUES */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">
                Empowering every student to find their perfect educational path through personalized guidance, 
                transparent processes, and unwavering support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[#FDB813]/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#c28c0e]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">
                To be India's most trusted educational consultancy by 2030, helping 1 million students 
                achieve their career dreams through innovative guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Promise</h3>
              <p className="text-slate-500 leading-relaxed">
                Every student who walks through our doors will leave with clarity, confidence, and a 
                concrete plan for their educational and career success.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The principles that guide every interaction and decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-slate-100 text-center hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-sm text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC CEO FOUNDER MESSAGE */}
      {!isLoading && ceo && (
        <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 lg:p-12 border border-amber-100 shadow-xl shadow-amber-900/5 relative"
              >
                <Quote className="w-16 h-16 text-[#FDB813]/40 mb-6" />
                <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 italic">
                  "{ceo.bio}"
                </blockquote>
                <div className="flex items-center gap-4">
                  
                  {/* Clean CEO Image handling */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDB813]/20 to-[#FDB813]/40 flex items-center justify-center text-[#c28c0e] font-black text-2xl relative overflow-hidden shadow-md">
                    <span className="absolute inset-0 flex items-center justify-center">
                      {ceo.name?.charAt(0)}
                    </span>
                    {ceo.image_url && (
                      <img 
                        src={ceo.image_url} 
                        alt="" 
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-black text-slate-900 text-lg">{ceo.name}</div>
                    <div className="text-[#c28c0e] font-bold text-sm">{ceo.role}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 5. TEAM SECTION */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Experienced professionals dedicated to your educational success.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#FDB813] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Map only the regular team members here (excluding the CEO) */}
              {regularTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FDB813]/20 to-[#FDB813]/40 flex items-center justify-center text-[#c28c0e] font-black text-3xl mx-auto mb-4 group-hover:from-[#FDB813]/40 group-hover:to-[#FDB813]/60 transition-all overflow-hidden relative">
                    
                    <span className="absolute inset-0 flex items-center justify-center">
                      {member.name?.charAt(0)}
                    </span>
                    
                    {member.image_url && (
                      <img 
                        src={member.image_url} 
                        alt="" 
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}

                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-[#c28c0e] font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-slate-500 text-sm mb-4">{member.bio}</p>
                  
                  {member.expertise && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs">
                      <Award className="w-3 h-3" />
                      {member.expertise}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {teamMembers.length === 0 && (
                <div className="col-span-full text-center text-slate-500 py-10">
                  No team members added yet. Check the Admin Portal.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
