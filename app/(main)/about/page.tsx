"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Users, Shield, Award, Linkedin, Quote } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/data";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 gradient-bg overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Building Futures Since 2009
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From a small counseling desk to Karnataka's most trusted educational consultancy, 
              our journey has been about one thing — helping students achieve their dreams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story / Timeline */}
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
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 lg:-translate-x-1/2" />

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
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-bold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-500">{milestone.description}</p>
                    </div>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                      <span className="text-white font-bold text-sm">{milestone.year.slice(-2)}</span>
                    </div>
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
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
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-amber-600" />
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

          {/* Core Values */}
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

      {/* Founder Message */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 lg:p-12 border border-slate-100 relative"
            >
              <Quote className="w-16 h-16 text-amber-200 mb-6" />
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8">
                "When I started Vidhyarthi Sewa in 2009, I had one simple goal — to ensure that no student 
                ever feels lost or confused about their educational journey. Today, as we look back at 
                10,000+ success stories, I am filled with gratitude and renewed determination to help 
                even more students achieve their dreams."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-2xl">
                  R
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Dr. Rajesh Kumar</div>
                  <div className="text-slate-500">Founder & CEO, Vidhyarthi Sewa</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-3xl mx-auto mb-4 group-hover:from-amber-200 group-hover:to-amber-300 transition-all overflow-hidden">
                  <img 
                    src={`/images/team/${member.id}.jpg`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="fallback-initial">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-slate-500 text-sm mb-4">{member.bio}</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs">
                  <Award className="w-3 h-3" />
                  {member.expertise}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-8">
              Let our experts guide you toward the right educational path. Book your free counseling session today.
            </p>
            <Button
              size="lg"
              className="pulse-glow text-lg"
              onClick={() => {
                const el = document.getElementById("counseling-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Free Counseling
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
