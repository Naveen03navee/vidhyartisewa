"use client";

import { motion } from "framer-motion";
import { 
  Star, Quote, Trophy, GraduationCap, Building2, 
  TrendingUp, Award, Users, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TESTIMONIALS } from "@/lib/data";

const successMetrics = [
  { icon: Users, value: "10,000+", label: "Students Placed", color: "blue" },
  { icon: TrendingUp, value: "₹8.5 LPA", label: "Average Package", color: "emerald" },
  { icon: Building2, value: "500+", label: "Recruiting Companies", color: "amber" },
  { icon: Award, value: "98%", label: "Success Rate", color: "rose" },
];

const topCompanies = [
  "TCS", "Infosys", "Wipro", "Amazon", "Microsoft", "Google", 
  "Deloitte", "KPMG", "Apollo", "Fortis", "HDFC Bank", "ICICI"
];

export default function SuccessStoriesPage() {
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
              <Trophy className="w-4 h-4" />
              Success Stories
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Real Stories, Real Success
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              See how we helped students achieve their dreams. From confused aspirants to confident professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100"
              >
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}-50 flex items-center justify-center mx-auto mb-4`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Authentic testimonials from students who transformed their careers with our guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Quote className="w-10 h-10 text-amber-100 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">
                      {testimonial.course} • {testimonial.college}
                    </div>
                  </div>
                </div>

                {testimonial.placement && (
                  <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-700">
                      Placed at <strong>{testimonial.placement.company}</strong> — {testimonial.placement.package}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Results */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
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
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 text-center"
              >
                <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>{item.count}</div>
                <div className="font-semibold text-slate-900 mb-1">{item.course}</div>
                <div className="text-sm text-slate-500">{item.colleges}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Top Recruiting Companies
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our students are placed at leading companies across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topCompanies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-slate-100 flex items-center justify-center hover:shadow-md transition-all hover:-translate-y-1"
              >
                <span className="font-bold text-slate-700">{company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Be Our Next Success Story
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Join thousands of students who achieved their dreams with Vidhyarthi Sewa guidance.
            </p>
            <Button
              size="lg"
              className="pulse-glow text-lg"
              onClick={() => {
                const el = document.getElementById("counseling-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
