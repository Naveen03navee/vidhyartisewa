"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, GraduationCap, IndianRupee } from "lucide-react";
import { COURSES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function FeaturedCourses() {
  const featured = COURSES.slice(0, 6);

  return (
    <section id="courses" className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Popular Courses
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Explore Our Top Courses
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Discover courses across Engineering, Medical, Nursing, Management and more with excellent career prospects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="blue" className="text-xs">
                    {course.category}
                  </Badge>
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

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>Eligibility: {course.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                    <span>Fees: {course.fees_range}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-slate-400">Top careers:</span>
                  {course.career_opportunities.slice(0, 2).map(career => (
                    <span key={career} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {career}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/courses/`}
                  className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm group-hover:gap-3 transition-all"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/courses/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
