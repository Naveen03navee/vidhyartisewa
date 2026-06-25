import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, Building2, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PARTNER_COLLEGES } from "@/lib/data";

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

export function generateStaticParams() {
  return PARTNER_COLLEGES.map((college) => ({
    slug: college.slug,
  }));
}

export default function CollegeDetailPage({ params }: { params: { slug: string } }) {
  const college = PARTNER_COLLEGES.find((c) => c.slug === params.slug);

  if (!college) {
    notFound();
  }

  // Uses database URL if it exists (for new admin uploads), or builds it dynamically for existing ones
  const imageSource = (college as any).image_url || `${SUPABASE_IMAGE_URL}/colleges/${college.slug}.jpg`;

  return (
    <div className="pt-24 pb-20 container-custom min-h-screen">
      {/* Back Button */}
      <Link href="/colleges" className="inline-flex items-center text-sm text-slate-500 hover:text-amber-600 mb-8 transition-colors">
        ← Back to all colleges
      </Link>

      {/* Main Header Section */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Logo (Now fetching from Supabase Storage) */}
        <div className="w-32 h-32 shrink-0 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center p-2 overflow-hidden">
          <img 
            src={imageSource} 
            alt={college.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
              {college.type}
            </Badge>
            <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
              <Star className="w-4 h-4 fill-amber-500" />
              {college.rating} Rating
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {college.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {college.location}
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              Established {college.established}
            </div>
            
            {/* Official Website Link */}
            {college.website && (
              <a 
                href={college.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                Official Website
              </a>
            )}
          </div>

          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            {college.description}
          </p>
        </div>
      </div>

      {/* Grid Layout for details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Courses */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Programs Offered</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {college.courses.map((course) => (
                <div key={course} className="p-4 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-700">
                  {course}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Stats & CTA */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Placement Statistics</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-sm text-slate-500 mb-1">Placement Rate</div>
                <div className="text-2xl font-bold text-emerald-600">{college.placement_stats.placement_rate}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-sm text-slate-500 mb-1">Average Package</div>
                <div className="text-2xl font-bold text-slate-900">{college.placement_stats.average_package}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white text-center shadow-lg">
            <h3 className="font-bold text-xl mb-2">Want to apply here?</h3>
            <p className="text-white/70 text-sm mb-6">Get expert guidance on admission process and eligibility.</p>
            <Link href="/#counseling-form" className="block w-full">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 border-none">
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}