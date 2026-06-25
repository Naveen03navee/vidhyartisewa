"use client";
import "../../globals.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  LogOut, 
  Menu,
  X,
  Settings,
  Briefcase,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

// UNCOMMENT THIS WHEN READY FOR REAL LOGOUT:
// import { supabase } from "@/lib/supabase/client";

const SIDEBAR_LINKS = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Colleges", href: "/admin/dashboard/colleges", icon: Building2 },
  { name: "Courses", href: "/admin/dashboard/courses", icon: GraduationCap },
  { name: "Blogs", href: "/admin/dashboard/blogs", icon: BookOpen },
  { name: "Success-stories", href: "/admin/dashboard/success-stories", icon: MessageSquare },
  { name: "Recruiting Companies", href: "/admin/dashboard/recruiters", icon: Briefcase },
  { name: "Team & CEO", href: "/admin/dashboard/team", icon: Users },
  { name: "Site Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // REAL SUPABASE LOGOUT (Uncomment when ready)
    // await supabase.auth.signOut();
    
    // Redirect to login page
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 1. MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-slate-300 z-50 flex flex-col transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Admin Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6138] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <span className="font-bold text-white text-lg tracking-wide">Admin Portal</span>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 hide-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${isActive 
                    ? "bg-[#FF6138] text-white shadow-lg shadow-[#FF6138]/20" 
                    : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Area */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black text-slate-800 hidden sm:block">
              {SIDEBAR_LINKS.find(l => l.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900">Administrator</div>
              <div className="text-xs font-medium text-slate-500">admin@vidhyarthisewa.com</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-amber-700 font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-50">
          {children}
        </div>

      </main>
    </div>
  );
}