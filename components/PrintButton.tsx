"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} className="bg-amber-600">
      <Printer className="w-4 h-4 mr-2" /> Print/Save as PDF
    </Button>
  );
}