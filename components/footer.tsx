"use client";

import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white print:hidden">
      {/* CTA Section */}
      <div className="border-b border-slate-800">
        <div className="container-custom py-16">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 lg:p-12 text-center lg:text-left relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                  Ready to Shape Your Future?
                </h3>
                <p className="text-amber-100 text-lg">
                  Book your free counseling session today and take the first step toward your dream career.
                </p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-amber-600 hover:bg-slate-100 whitespace-nowrap"
                onClick={() => {
                  const el = document.getElementById("counseling-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book Free Counseling
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/logo/logo-white.png"
                  alt="Vidhyarthi Sewa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                  }}
                />
                <GraduationCap className="w-6 h-6 text-white fallback-icon hidden" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Vidhyarthi Sewa</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
                  Career & Admissions
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Vidhyarthi Sewa is Karnataka's most trusted educational consultancy, helping students discover careers, choose the right colleges, and secure admissions since 2009.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about/", label: "About Us" },
                { href: "/career-guidance/", label: "Career Guidance" },
                { href: "/colleges/", label: "Partner Colleges" },
                { href: "/courses/", label: "Courses" },
                { href: "/success-stories/", label: "Success Stories" },
                { href: "/blog/", label: "Blog & Resources" },
                { href: "/contact/", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {[
                "Engineering (B.Tech)",
                "Medical (MBBS)",
                "Nursing (B.Sc)",
                "Management (BBA/MBA)",
                "Commerce (B.Com)",
                "Computer Applications (BCA/MCA)",
                "Pharmacy (B.Pharm)",
                "Allied Health Sciences",
              ].map((course) => (
                <li key={course}>
                  <Link
                    href="/courses/"
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                                      <p className="text-sm text-slate-400">1st Floor, A S Mansion, BB Rd, Yelahanka, Bengaluru, Karnataka 560064</p> 
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="tel:+919341993429" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                  +91 93419 93429
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="tel:+919620012369" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                  +91 96200 12369
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="mailto:info@vidhyarthisewa.org" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                  info@vidhyarthisewa.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-slate-400 text-sm">
                  Mon - Sat: 9:00 AM - 7:00 PM
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-white font-medium text-sm mb-3">Subscribe to Updates</h5>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button size="sm" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Vidhyarthi Sewa Career & Admission Consultancy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
