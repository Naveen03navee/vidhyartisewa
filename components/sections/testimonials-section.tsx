"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Hear from students who achieved their dreams with our guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-amber-100 mb-4" />

              {/* Rating */}
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

              {/* Text */}
              <p className="text-slate-600 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg overflow-hidden">
                  <img 
                    src={`/images/testimonials/${testimonial.id}.jpg`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="fallback-initial">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">
                    {testimonial.course} • {testimonial.college}
                  </div>
                </div>
              </div>

              {/* Placement badge */}
              {testimonial.placement && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  <span>Placed at {testimonial.placement.company}</span>
                  <span className="font-bold">{testimonial.placement.package}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
