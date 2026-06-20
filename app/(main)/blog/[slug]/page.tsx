import { notFound } from "next/navigation";
import { COURSES, PARTNER_COLLEGES } from "@/lib/data";
import { PrintButton } from "@/components/PrintButton";

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
    <div className="p-8 max-w-4xl mx-auto bg-white text-slate-900 print:p-0">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <PrintButton />
      </div>

      <div className="border-b-4 border-amber-500 pb-6 mb-8">
        <h1 className="text-4xl font-bold">{course.name}</h1>
        <p className="text-slate-500 mt-2">Course Brochure - Vidhyarthi Sewa</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-slate-400 uppercase text-xs">Course Details</h3>
          <p className="mt-2"><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Eligibility:</strong> {course.eligibility}</p>
          <p><strong>Fees:</strong> {course.fees_range}</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-400 uppercase text-xs">Salary Insights (LPA)</h3>
          <p className="mt-2"><strong>Entry:</strong> {course.salary_insights.entry}</p>
          <p><strong>Mid:</strong> {course.salary_insights.mid}</p>
          <p><strong>Senior:</strong> {course.salary_insights.senior}</p>
        </div>
      </div>

      <h3 className="font-bold text-slate-400 uppercase text-xs mb-4">About the Course</h3>
      <p className="mb-8">{course.description}</p>

      <h3 className="font-bold text-slate-400 uppercase text-xs mb-4">Partner Colleges Offering This</h3>
      <div className="space-y-4 mb-8">
        {offeringColleges.map(college => (
          <div key={college.id} className="p-4 bg-slate-50 rounded-lg">
            <h4 className="font-bold">{college.name}</h4>
            <p className="text-sm text-slate-600">{college.location} | Avg Package: {college.placement_stats.average_package}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-slate-400 uppercase text-xs mb-4">Career Outlook</h3>
      <div className="flex flex-wrap gap-2">
        {course.career_opportunities.map(career => (
          <span key={career} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
            {career}
          </span>
        ))}
      </div>
    </div>
  );
}