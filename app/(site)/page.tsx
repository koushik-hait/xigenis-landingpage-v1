import {
  HeroSection,
  TopPerformerSection,
  AboutSection,
  ProblemsSection,
  TargetAudienceSection,
  TransformationSection,
  LeadQualitySection,
  FollowUpSection,
  AdSpendSection,
  ReferralSection,
  FixSection,
  PerformanceMetrics,
  SocialProofSection,
  ReasonsSection,
  CTASection,
  ProcessTimeline,
  CaseStudies,
  WhyChooseUs,
  FeaturesSection,
  CampaignInsights,
  FAQSection,
  TestimonialSection,
  RealEstateHero,
} from "@/components/home"
import { getCmsContent } from "@/app/actions/cms"

export default async function Web() {
  // Fetch dynamic content
  const heroCmsData = await getCmsContent('home', 'hero');

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <HeroSection cmsContent={heroCmsData as any} />

      {/* Top Performers Section */}
      <TopPerformerSection />

      {/* Target Audience - For you / Not for you */}
      <TargetAudienceSection />

      {/* The 90-Day Transformation */}
      <TransformationSection />

      {/* The Real Problems - Dark section */}
      <ProblemsSection />

      {/* Lead Quality Section */}
      <LeadQualitySection />

      {/* Follow Up Section */}
      <FollowUpSection />

      {/* Ad Spend Section */}
      <AdSpendSection />

      {/* Referral Section */}
      <ReferralSection />

      {/* Fix Section */}
      <FixSection />

      {/* About Company */}
      <AboutSection />

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Social Proof / Testimonials */}
      <SocialProofSection />

      {/* Reasons Section */}
      <ReasonsSection />

      {/* Cta Section */}
      <CTASection />

      {/* Process Section */}
      <ProcessTimeline />

      {/* Case Studies */}
      <CaseStudies />

      {/* WhyChooseUs section */}
      <WhyChooseUs />

      {/* Campaign Insights */}
      <CampaignInsights />

      {/* Features Section */}
      <FeaturesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Real Estate Hero */}
      <RealEstateHero />
    </div>
  )
}
