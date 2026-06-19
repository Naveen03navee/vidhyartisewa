"use client";

import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton() {
  const phone = "919620012369";
  const message = "Hello, I would like guidance regarding college admissions.";

  return (
    <a
      href={generateWhatsAppLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
        <span className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-pulse" />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
        </div>
      </div>
    </a>
  );
}
