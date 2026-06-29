"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase-client";

export function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      
      // 1. Fetch Contact & Social Settings (Using 'site_setting' singular)
      const { data: settingsData } = await supabase.from("site_setting").select("*").eq("id", 1).single();
      if (settingsData) setSettings(settingsData);

      // 2. Fetch Live Courses for the Footer Links (Limits to top 8)
      const { data: coursesData } = await supabase.from("courses").select("*").limit(8);
      if (coursesData) setCourses(coursesData);
    }
    
    fetchData();
  }, []);

  // Filter out social links that don't have URLs in the database
  const socialLinks = [
    { Icon: Facebook, url: settings?.facebook_url },
    { Icon: Twitter, url: settings?.twitter_url },
    { Icon: Instagram, url: settings?.instagram_url },
    { Icon: Linkedin, url: settings?.linkedin_url },
    { Icon: Youtube, url: settings?.youtube_url },
  ].filter(link => link.url); 

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
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Shape Your Future?</h3>
                <p className="text-amber-100 text-lg">Book your free counseling session today.</p>
              </div>
              <Link href="/#counseling-form">
                <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-slate-100 whitespace-nowrap">
                  Book Free Counseling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">

            <Link href="/" className="flex items-center gap-2 mb-6 group">
  <div className="w-16 h-16 flex items-center justify-center overflow-hidden transition-all duration-300">
    <img
      src="/images/logo/logo-white.png"
      alt="Vidhyarthi Sewa"
      className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] brightness-110 group-hover:scale-105 transition-all duration-300"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        target.parentElement
          ?.querySelector(".fallback-icon")
          ?.classList.remove("hidden");
      }}
    />
    <GraduationCap className="w-6 h-6 text-white fallback-icon hidden" />
  </div>

  <div className="flex flex-col">
    <span className="text-xl font-bold text-white">
      Vidhyarthi Sewa
    </span>
    <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
      Career & Admissions
    </span>
  </div>
</Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Vidhyarthi Sewa is Karnataka's most trusted educational consultancy, helping students discover careers, choose the right colleges, and secure admissions since 2009.
            </p>
            
            {/* Dynamic Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all">
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
                { href: "/", label: "Home" }, { href: "/about/", label: "About Us" },
                { href: "/career-guidance/", label: "Career Guidance" }, { href: "/colleges/", label: "Partner Colleges" },
                { href: "/courses/", label: "Courses" }, { href: "/success-stories/", label: "Success Stories" },
                { href: "/blog/", label: "Blog & Resources" }, { href: "/contact/", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DYNAMIC Courses (Fetched from Database) */}
          <div>
            <h4 className="text-white font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course.id}>
                    {/* Using course.slug or course.id to link dynamically */}
                    <Link href={`/courses/${course.slug || course.id}`} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                      {course.name || course.title} 
                    </Link>
                  </li>
                ))
              ) : (
                <span className="text-slate-500 text-sm italic">Loading courses...</span>
              )}
            </ul>
          </div>

          {/* Contact Info (Fetched from Database) */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">{settings.phone}</a>
                </li>
              )}
              {settings?.contact_email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">{settings.contact_email}</a>
                </li>
              )}
              {settings?.timing && (
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-slate-400 text-sm">{settings.timing}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}