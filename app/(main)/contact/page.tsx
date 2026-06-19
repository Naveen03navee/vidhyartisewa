"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2,
  MessageCircle, GraduationCap, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COURSE_CATEGORIES } from "@/lib/data";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Try API first
    let apiSuccess = false;
    try {
      const response = await fetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) apiSuccess = true;
    } catch (e) {
      console.log('API unavailable, using localStorage');
    }

    // Fallback to localStorage
    const contacts = JSON.parse(localStorage.getItem('vidhyarthisewa_contacts') || '[]');
    contacts.push({ ...data, id: Date.now(), created_at: new Date().toISOString(), source: apiSuccess ? 'api' : 'local' });
    localStorage.setItem('vidhyarthisewa_contacts', JSON.stringify(contacts));

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
              <MessageCircle className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Have questions? We are here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: MapPin, 
                title: "Visit Us", 
                lines: ["2nd Floor, A S Complex", "Near Whitefield, Bangalore - 560066", "Karnataka, India"],
                color: "blue"
              },
              { 
                icon: Phone, 
                title: "Call Us", 
                lines: ["+91 93419 93429", "+91 96200 12369"],
                color: "emerald",
                href: "tel:+919341993429"
              },
              { 
                icon: Mail, 
                title: "Email Us", 
                lines: ["info@vidhyarthisewa.org", "admissions@vidhyarthisewa.org"],
                color: "amber",
                href: "mailto:info@vidhyarthisewa.org"
              },
              { 
                icon: Clock, 
                title: "Working Hours", 
                lines: ["Monday - Saturday", "9:00 AM - 7:00 PM", "Sunday: Closed"],
                color: "rose"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-${item.color}-50 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-500`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <div className="space-y-1">
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-sm text-slate-500">
                      {item.href && i === 0 ? (
                        <a href={item.href} className="hover:text-amber-600 transition-colors">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate-500 mb-8">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-8 border border-slate-100 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. Our team will contact you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="contact-name">Full Name *</Label>
                      <Input id="contact-name" name="name" required placeholder="Your name" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Mobile Number *</Label>
                      <Input id="contact-phone" name="phone" required placeholder="10-digit number" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address *</Label>
                      <Input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="contact-course">Interested Course</Label>
                      <select id="contact-course" name="course" className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                        <option value="">Select Course</option>
                        {COURSE_CATEGORIES.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="contact-college">Preferred College</Label>
                    <Input id="contact-college" name="college" placeholder="College name (optional)" className="mt-2" />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea 
                      id="contact-message" 
                      name="message" 
                      placeholder="Your message or questions..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full pulse-glow" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Book Free Counseling
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-80">
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">Bangalore, Karnataka</p>
                    <p className="text-sm text-slate-400">2nd Floor, A S Complex, Whitefield</p>
                    <a 
                      href="https://maps.google.com/?q=Whitefield,Bangalore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-amber-600 font-medium text-sm hover:underline"
                    >
                      Open in Google Maps
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick contact */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/919620012369?text=Hello, I would like guidance regarding college admissions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-emerald-800">WhatsApp Us</div>
                      <div className="text-sm text-emerald-600">+91 96200 12369</div>
                    </div>
                  </a>
                  <a 
                    href="tel:+919341993429"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">Call Us Now</div>
                      <div className="text-sm text-blue-600">+91 93419 93429</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
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
              Visit Our Office
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              We welcome you to visit our office for a face-to-face counseling session. 
              Walk-ins are welcome during working hours.
            </p>
            <Button
              size="lg"
              variant="glass"
              className="text-lg"
              onClick={() => {
                window.open("https://maps.google.com/?q=Whitefield,Bangalore", "_blank");
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Get Directions
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
