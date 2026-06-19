import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { ServicesSection } from "@/components/sections/services-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { AdmissionProcessSection } from "@/components/sections/admission-process-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CounselingForm } from "@/components/forms/counseling-form";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PartnerMarquee />
      <ServicesSection />
      <FeaturedCourses />
      <RoadmapSection />
      <TestimonialsSection />
      <AdmissionProcessSection />
      <CtaBanner />
      <FAQSection />
      <CounselingForm />
    </>
  );
}
