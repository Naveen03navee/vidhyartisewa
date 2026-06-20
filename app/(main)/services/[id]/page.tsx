import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";

// This tells Cloudflare/Next.js to build a static page for every service at build time
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-slate-500 hover:text-amber-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">{service.title}</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            {service.description}
          </p>

          <h2 className="text-xl font-bold text-slate-900 mb-6">Key Features</h2>
          <ul className="space-y-4 mb-10">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in this service?</h3>
            <p className="text-slate-500 mb-6">Speak with our experts to get started.</p>
            <Link href="/#counseling-form">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Book Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}