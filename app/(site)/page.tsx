"use client"

import {
  HeroSection,
  AboutSection,
  ProblemsSection,
  LeadAuditSection,
  ReasonsSection,
  StatsSection,
  SalesInsightsSection,
  TargetAudienceSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home"

export default function Web() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <HeroSection scrollToSection={scrollToSection} />

      {/* About - Light white section */}
      <AboutSection />

      {/* Target Audience - For you / Not for you */}
      <TargetAudienceSection />

      {/* Lead Quality Audit - Dark section */}
      <LeadAuditSection />

      {/* The Real Problems - Dark section */}
      <ProblemsSection />

      {/* Stats - Dark navy section */}
      <StatsSection />

      {/* 8 Reasons - Light section */}
      <ReasonsSection />

      {/* Sales Insights - Light section */}
      <SalesInsightsSection />

      {/* Testimonials - Dark section */}
      <TestimonialsSection />

      {/* Final CTA - Dark navy section */}
      <CTASection scrollToSection={scrollToSection} />
    </div>
  )
}
