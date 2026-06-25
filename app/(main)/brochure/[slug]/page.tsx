// app/(main)/brochure/[slug]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { PrintButton } from "@/components/PrintButton";
import { Clock, GraduationCap, IndianRupee, Briefcase, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BrochurePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // 1. Fetch Course
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", params.slug)
    .single();

  // 2. Fetch Colleges
  const { data: colleges } = await supabase.from("colleges").select("*");

  if (!course) return notFound();

  // 3. STRICT SLUG MATCH FILTER
  const offeringColleges = colleges?.filter((college: any) => {
    // Ensure we are working with an array
    const collegeCourses = Array.isArray(college.courses) ? college.courses : [];
    
    // Check if the college's course list explicitly includes this exact course slug
    return collegeCourses.some((slug: string) => 
      slug.trim().toLowerCase() === course.slug.trim().toLowerCase()
    );
  }) || [];

  return (
    <div className="min-h-screen bg-slate-100 py-12 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto bg-white p-16 shadow-2xl print:shadow-none print:w-full">
        
        <div className="flex justify-between items-center mb-10 print:hidden">
          <p className="text-slate-500">Official Course Brochure</p>
          <PrintButton />
        </div>

        <h1 className="text-5xl font-black mb-6">{course.name}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div><p className="text-xs uppercase font-bold text-slate-500 mb-1">Duration</p><p className="font-bold">{course.duration}</p></div>
            <div><p className="text-xs uppercase font-bold text-slate-500 mb-1">Eligibility</p><p className="font-bold">{course.eligibility}</p></div>
            <div><p className="text-xs uppercase font-bold text-slate-500 mb-1">Fees</p><p className="font-bold">{course.fees_range}</p></div>
            <div><p className="text-xs uppercase font-bold text-slate-500 mb-1">Entry Salary</p><p className="font-bold">{course.salary_insights?.entry || "N/A"}</p></div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-amber-500 pl-3">About the Program</h2>
          <p className="text-lg text-slate-700 leading-relaxed">{course.description}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-amber-500 pl-3">Partnered Colleges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offeringColleges.length > 0 ? (
                offeringColleges.map((college: any) => (
                  <div key={college.id} className="border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{college.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-500" /> {college.location}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 col-span-2 bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                  Currently, no partner colleges are listed specifically for this course. Please contact us for details.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
} 