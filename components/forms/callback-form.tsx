"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const callbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter valid 10-digit phone"),
  best_time: z.string().min(1, "Select best time"),
});

type CallbackFormData = z.infer<typeof callbackSchema>;

export function CallbackRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackSchema),
  });

  const onSubmit = async (data: CallbackFormData) => {
    setIsSubmitting(true);

    try {
      // Try API first
      let apiSuccess = false;
      try {
        const response = await fetch('/api/callbacks/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) apiSuccess = true;
      } catch (e) {
        console.log('API unavailable, using localStorage');
      }

      // Fallback to localStorage
      const callbacks = JSON.parse(localStorage.getItem('vidhyarthisewa_callbacks') || '[]');
      callbacks.push({ ...data, id: Date.now(), created_at: new Date().toISOString(), source: apiSuccess ? 'api' : 'local' });
      localStorage.setItem('vidhyarthisewa_callbacks', JSON.stringify(callbacks));

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        reset();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 left-6 z-50 group">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Request Callback
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-500" />
            Request a Callback
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Request Submitted!</h3>
            <p className="text-slate-500 text-sm">Our counselor will call you back shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="callback-name">Full Name</Label>
              <Input id="callback-name" {...register("name")} placeholder="Your name" className="mt-1" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="callback-phone">Phone Number</Label>
              <Input id="callback-phone" {...register("phone")} placeholder="10-digit number" className="mt-1" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="callback-time">Best Time to Call</Label>
              <select 
                id="callback-time" 
                {...register("best_time")}
                className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-1"
              >
                <option value="">Select time</option>
                <option value="9am-12pm">9:00 AM - 12:00 PM</option>
                <option value="12pm-3pm">12:00 PM - 3:00 PM</option>
                <option value="3pm-6pm">3:00 PM - 6:00 PM</option>
                <option value="6pm-8pm">6:00 PM - 8:00 PM</option>
              </select>
              {errors.best_time && <p className="text-red-500 text-xs mt-1">{errors.best_time.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Request Callback
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
