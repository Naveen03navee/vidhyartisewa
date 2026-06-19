"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Phone, Mail, MapPin, BookOpen, GraduationCap, 
  Building2, DollarSign, CheckCircle, ChevronRight, ChevronLeft,
  Send, Loader2, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PARTNER_COLLEGES, COURSE_CATEGORIES } from "@/lib/data";

const stepSchemas = [
  z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().regex(/^[0-9]{10}$/, "Enter valid 10-digit phone"),
    email: z.string().email("Enter valid email"),
    city: z.string().min(2, "City is required"),
  }),
  z.object({
    tenth_percentage: z.string().optional(),
    twelfth_percentage: z.string().optional(),
    board: z.string().optional(),
    stream: z.string().optional(),
  }),
  z.object({
    primary_interest: z.string().min(1, "Select primary interest"),
    secondary_interest: z.string().optional(),
    budget_range: z.string().optional(),
  }),
  z.object({
    preferred_colleges: z.array(z.string()).optional(),
    location_preference: z.string().optional(),
    hostel_required: z.boolean().optional(),
  }),
  z.object({
    message: z.string().optional(),
  }),
];

type FormData = z.infer<typeof stepSchemas[0]> & 
  z.infer<typeof stepSchemas[1]> & 
  z.infer<typeof stepSchemas[2]> & 
  z.infer<typeof stepSchemas[3]> & 
  z.infer<typeof stepSchemas[4]>;

const steps = [
  { title: "Personal Details", icon: User },
  { title: "Academic Info", icon: GraduationCap },
  { title: "Course Interest", icon: BookOpen },
  { title: "Preferences", icon: Building2 },
  { title: "Submit", icon: Send },
];

export function CounselingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(stepSchemas[currentStep]),
    mode: "onChange",
  });

  const toggleCollege = (collegeName: string) => {
    setSelectedColleges(prev => 
      prev.includes(collegeName) 
        ? prev.filter(c => c !== collegeName)
        : [...prev, collegeName]
    );
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep < 4) {
      const isValid = await trigger();
      if (isValid) {
        setCurrentStep(prev => prev + 1);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        ...data,
        preferred_colleges: selectedColleges,
      };

      // In static export, we'll store in localStorage and show success
      const inquiries = JSON.parse(localStorage.getItem('vidhyarthisewa_inquiries') || '[]');
      inquiries.push({ ...formData, id: Date.now(), created_at: new Date().toISOString() });
      localStorage.setItem('vidhyarthisewa_inquiries', JSON.stringify(inquiries));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Thank You!
        </h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Your inquiry has been submitted successfully. Our counselor will contact you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/919620012369?text=Hello, I just submitted my inquiry and would like to discuss further."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Submit Another Inquiry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <section id="counseling-form" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              Free Counseling
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Book Your Free Counseling Session
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Fill in your details and get a free career assessment report worth ₹2,000.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Step indicator */}
            <div className="bg-slate-50 px-6 py-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" 
                            : isCompleted 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-200 text-slate-400"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`text-xs font-medium mt-2 hidden sm:block ${
                          isActive ? "text-amber-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-colors ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-200"
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form content */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Details */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" {...register("name")} placeholder="Enter your full name" className="mt-2" />
                          {(errors as any).name && <p className="text-red-500 text-sm mt-1">{(errors as any).name.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" {...register("phone")} placeholder="10-digit mobile number" className="mt-2" />
                          {(errors as any).phone && <p className="text-red-500 text-sm mt-1">{(errors as any).phone.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" {...register("email")} placeholder="your@email.com" className="mt-2" />
                          {(errors as any).email && <p className="text-red-500 text-sm mt-1">{(errors as any).email.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" {...register("city")} placeholder="Your city" className="mt-2" />
                          {(errors as any).city && <p className="text-red-500 text-sm mt-1">{(errors as any).city.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Academic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Academic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="tenth_percentage">10th Percentage</Label>
                          <Input id="tenth_percentage" {...register("tenth_percentage")} placeholder="e.g., 85%" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="twelfth_percentage">12th Percentage</Label>
                          <Input id="twelfth_percentage" {...register("twelfth_percentage")} placeholder="e.g., 88%" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="board">Board</Label>
                          <select id="board" {...register("board")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select Board</option>
                            <option value="CBSE">CBSE</option>
                            <option value="State">State Board</option>
                            <option value="ICSE">ICSE</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="stream">Stream</Label>
                          <select id="stream" {...register("stream")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select Stream</option>
                            <option value="PCM">PCM (Physics, Chemistry, Math)</option>
                            <option value="PCB">PCB (Physics, Chemistry, Biology)</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Course Interest */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Course Interest</h3>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="primary_interest">Primary Interest *</Label>
                          <select id="primary_interest" {...register("primary_interest")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select Course Category</option>
                            {COURSE_CATEGORIES.filter(c => c !== 'All').map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          {(errors as any).primary_interest && <p className="text-red-500 text-sm mt-1">{(errors as any).primary_interest.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="secondary_interest">Secondary Interest</Label>
                          <select id="secondary_interest" {...register("secondary_interest")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select (Optional)</option>
                            {COURSE_CATEGORIES.filter(c => c !== 'All').map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="budget_range">Budget Range (Annual)</Label>
                          <select id="budget_range" {...register("budget_range")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select Budget</option>
                            <option value="below_1lakh">Below ₹1 Lakh</option>
                            <option value="1-3lakh">₹1 - ₹3 Lakh</option>
                            <option value="3-5lakh">₹3 - ₹5 Lakh</option>
                            <option value="5-10lakh">₹5 - ₹10 Lakh</option>
                            <option value="above_10lakh">Above ₹10 Lakh</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Preferences */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">College Preferences</h3>
                      <div className="space-y-6">
                        <div>
                          <Label className="mb-3 block">Preferred Colleges (Select multiple)</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {PARTNER_COLLEGES.map(college => (
                              <button
                                key={college.id}
                                type="button"
                                onClick={() => toggleCollege(college.name)}
                                className={`p-3 rounded-lg border text-left text-sm transition-all ${
                                  selectedColleges.includes(college.name)
                                    ? "border-amber-500 bg-amber-50 text-amber-700"
                                    : "border-slate-200 hover:border-amber-300 text-slate-600"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <CheckCircle className={`w-4 h-4 ${selectedColleges.includes(college.name) ? "text-amber-500" : "text-slate-300"}`} />
                                  {college.name}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location_preference">Location Preference</Label>
                          <select id="location_preference" {...register("location_preference")} className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm mt-2">
                            <option value="">Select Location</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Other Karnataka">Other Karnataka</option>
                            <option value="Outside Karnataka">Outside Karnataka</option>
                            <option value="No Preference">No Preference</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="hostel_required" 
                            {...register("hostel_required")}
                            className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                          />
                          <Label htmlFor="hostel_required" className="mb-0">I require hostel accommodation</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Additional Information</h3>
                      <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea 
                          id="message" 
                          {...register("message")} 
                          placeholder="Any specific requirements or questions..."
                          className="mt-2 min-h-[120px]"
                        />
                      </div>
                      <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                        <div className="flex items-start gap-3">
                          <Gift className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-800 mb-1">Free Career Assessment Report</h4>
                            <p className="text-amber-700 text-sm">
                              Upon submission, you will receive a personalized career assessment report worth ₹2,000 absolutely free!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? "invisible" : ""}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="pulse-glow"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : currentStep === 4 ? (
                    <>
                      Submit Inquiry
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
