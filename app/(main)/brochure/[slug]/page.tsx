import { notFound } from "next/navigation";
import { COURSES, PARTNER_COLLEGES } from "@/lib/data";
import { PrintButton } from "@/components/PrintButton";
import { Clock, GraduationCap, IndianRupee, Briefcase, MapPin } from "lucide-react";

export function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export default function BrochurePage({ params }: { params: { slug: string } }) {
  const course = COURSES.find((c) => c.slug === params.slug);
  
  if (!course) return notFound();

  const offeringColleges = PARTNER_COLLEGES.filter(c => 
    c.courses.includes(course.category || "")
  );

  return (
    <div className="min-h-screen bg-slate-100 py-12 print:py-0 print:bg-white">
      {/* The main document wrapper */}
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-2xl print:shadow-none print:p-0 print:rounded-none">
        
        {/* Action Bar (Hidden in Print) */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200 print:hidden">
          <p className="text-slate-500 font-medium">Preview Mode - Ready to print or save as PDF</p>
          <PrintButton />
        </div>

        {/* --- PRINTABLE CONTENT STARTS HERE --- */}
        
        {/* Professional Print Header */}
        <div className="flex justify-between items-end border-b-4 border-amber-500 pb-8 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">{course.name}</h1>
            <div className="flex gap-3 items-center">
              <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-slate-500 font-medium">Official Course Brochure</span>
            </div>
          </div>
          <div className="text-right hidden sm:block print:block">
             <div className="text-2xl font-black text-slate-900">Vidhyarthi <span className="text-amber-500">Sewa</span></div>
             <p className="text-sm text-slate-500">Career & Admission Consultancy</p>
             <p className="text-sm text-slate-500">www.vidhyarthisewa.org</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 bg-slate-50 p-6 rounded-xl print:bg-slate-50/50 print:border print:border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1"><Clock className="w-4 h-4"/> <span className="text-xs font-bold uppercase tracking-wider">Duration</span></div>
            <p className="font-semibold text-slate-900">{course.duration}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1"><GraduationCap className="w-4 h-4"/> <span className="text-xs font-bold uppercase tracking-wider">Eligibility</span></div>
            <p className="font-semibold text-slate-900">{course.eligibility}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1"><IndianRupee className="w-4 h-4"/> <span className="text-xs font-bold uppercase tracking-wider">Est. Fees</span></div>
            <p className="font-semibold text-slate-900">{course.fees_range}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1"><Briefcase className="w-4 h-4"/> <span className="text-xs font-bold uppercase tracking-wider">Entry Salary</span></div>
            <p className="font-semibold text-slate-900">{course.salary_insights.entry}</p>
          </div>
        </div>

        {/* Course Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-amber-500 pl-4 mb-4">About the Program</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Grid for Colleges and Careers */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Colleges */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-l-4 border-amber-500 pl-3 mb-6">Top Partner Colleges</h2>
            <div className="space-y-4">
              {offeringColleges.length > 0 ? offeringColleges.map(college => (
                <div key={college.id} className="border border-slate-100 rounded-lg p-4 print:break-inside-avoid print:border-slate-200">
                  <h4 className="font-bold text-slate-900">{college.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {college.location}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-50 text-sm print:border-slate-100">
                    <span className="text-slate-500">Highest Package:</span> <span className="font-semibold text-emerald-600 ml-1">{college.placement_stats.highest_package}</span>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-sm">Contact us for the latest partner college list for this course.</p>
              )}
            </div>
          </div>

          {/* Careers & Salary */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-l-4 border-amber-500 pl-3 mb-6">Career Trajectory</h2>
            
            <div className="bg-slate-50 p-5 rounded-lg mb-6 print:border print:border-slate-200 print:break-inside-avoid">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Salary Growth Outlook</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Entry Level</span>
                  <span className="font-bold text-slate-900">{course.salary_insights.entry}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-600">Mid Level</span>
                  <span className="font-bold text-slate-900">{course.salary_insights.mid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Senior Level</span>
                  <span className="font-bold text-emerald-600">{course.salary_insights.senior}</span>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Top Job Roles</h3>
            <ul className="space-y-2">
              {course.career_opportunities.map(career => (
                <li key={career} className="flex items-center gap-2 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  {career}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-8 border-t-2 border-slate-100 text-center print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to shape your future?</h3>
          <p className="text-slate-600 mb-6">Contact our expert counselors today for a free consultation and secure your admission.</p>
          <div className="inline-flex gap-6 justify-center text-sm font-medium text-slate-800 bg-amber-50 px-6 py-4 rounded-xl border border-amber-100">
            <span>📞 +91 93419 93429</span>
            <span>✉️ info@vidhyarthisewa.org</span>
          </div>
        </div>

      </div>
    </div>
  );
}