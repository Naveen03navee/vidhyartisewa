"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    // Check immediately on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Determine if nav should be solid (always solid white background)
  const isSolid = true;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          // ADDED print:hidden HERE
          "fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 print:hidden",
          isSolid
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center transition-all duration-300">
                <img 
                  src="/images/logo/logo.png"
                  className={cn(
                    "w-full h-full object-contain transition-all duration-300 group-hover:scale-105",
                    isSolid 
                      ? "filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" 
                      : "filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] brightness-110"
                  )}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                  }}
                  alt="Vidhyarthi Sewa Logo"
                />
                <GraduationCap className={cn("w-6 h-6 fallback-icon hidden", isSolid ? "text-amber-500" : "text-white")} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? isSolid
                          ? "text-amber-600 bg-amber-50"
                          : "text-amber-400 bg-white/10"
                        : isSolid
                        ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="sm"
                className="hidden sm:flex pulse-glow"
                onClick={() => {
                  const el = document.getElementById("counseling-form");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/#counseling-form";
                  }
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Book Free Counseling
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isSolid
                    ? "text-slate-900 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            // ADDED print:hidden HERE
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden print:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-lg font-medium transition-colors",
                        isActive
                          ? "text-amber-600 bg-amber-50"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Button
                  className="w-full pulse-glow"
                  size="lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById("counseling-form");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#counseling-form";
                      }
                    }, 300);
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Counseling
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}