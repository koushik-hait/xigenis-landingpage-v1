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

function ResponsiveSection({ Component, cmsData }: { Component: any, cmsData?: any }) {
  if (cmsData && cmsData.desktop && cmsData.mobile) {
    return (
      <div className="relative w-full">
        <div className="block md:hidden">
          <Component cmsContent={cmsData.mobile} />
        </div>
        <div className="hidden md:block">
          <Component cmsContent={cmsData.desktop} />
        </div>
      </div>
    )
  }

  // Fallback for flat structure
  return <Component cmsContent={cmsData} />
}

export default async function Web() {
  // Fetch dynamic content
  const heroCmsData = await getCmsContent('home', 'hero');
  const topPerformersCmsData = await getCmsContent('home', 'top-performers');
  const targetAudienceCmsData = await getCmsContent('home', 'target-audience');
  const transformationCmsData = await getCmsContent('home', 'transformation');
  const problemsCmsData = await getCmsContent('home', 'problems');
  const leadQualityCmsData = await getCmsContent('home', 'lead-quality');
  const followUpCmsData = await getCmsContent('home', 'follow-up');
  const adspendCmsData = await getCmsContent('home', 'adspend');
  const referralCmsData = await getCmsContent('home', 'referral');
  const fixCmsData = await getCmsContent('home', 'fix');
  const aboutCmsData = await getCmsContent('home', 'about');
  const performanceCmsData = await getCmsContent('home', 'performance');
  const socialProofCmsData = await getCmsContent('home', 'social-proof');
  const reasonsCmsData = await getCmsContent('home', 'reasons');
  const ctaCmsData = await getCmsContent('home', 'cta');
  const processCmsData = await getCmsContent('home', 'process');
  const caseStudiesCmsData = await getCmsContent('home', 'case-studies');
  const whyUsCmsData = await getCmsContent('home', 'why-us');
  const campaignInsightsCmsData = await getCmsContent('home', 'campaign-insights');

  const featuresCmsData = await getCmsContent('home', 'features');
  const faqCmsData = await getCmsContent('home', 'faq');
  const testimonialCmsData = await getCmsContent('home', 'testimonial');
  const realEstateHeroCmsData = await getCmsContent('home', 'real-estate-hero');

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <ResponsiveSection Component={HeroSection} cmsData={heroCmsData as any} />

      {/* Top Performers Section */}
      <ResponsiveSection Component={TopPerformerSection} cmsData={topPerformersCmsData as any} />

      {/* Target Audience - For you / Not for you */}
      <ResponsiveSection Component={TargetAudienceSection} cmsData={targetAudienceCmsData as any} />

      {/* The 90-Day Transformation */}
      <ResponsiveSection Component={TransformationSection} cmsData={transformationCmsData as any} />

      {/* The Real Problems - Dark section */}
      <ResponsiveSection Component={ProblemsSection} cmsData={problemsCmsData as any} />

      {/* Lead Quality Section */}
      <ResponsiveSection Component={LeadQualitySection} cmsData={leadQualityCmsData as any} />

      {/* Follow Up Section */}
      <ResponsiveSection Component={FollowUpSection} cmsData={followUpCmsData as any} />

      {/* Ad Spend Section */}
      <ResponsiveSection Component={AdSpendSection} cmsData={adspendCmsData as any} />

      {/* Referral Section */}
      <ResponsiveSection Component={ReferralSection} cmsData={referralCmsData as any} />

      {/* Fix Section */}
      <ResponsiveSection Component={FixSection} cmsData={fixCmsData as any} />

      {/* About Company */}
      <ResponsiveSection Component={AboutSection} cmsData={aboutCmsData as any} />

      {/* Performance Metrics */}
      <ResponsiveSection Component={PerformanceMetrics} cmsData={performanceCmsData as any} />

      {/* Social Proof / Testimonials */}
      <ResponsiveSection Component={SocialProofSection} cmsData={socialProofCmsData as any} />

      {/* Reasons Section */}
      <ResponsiveSection Component={ReasonsSection} cmsData={reasonsCmsData as any} />

      {/* Cta Section */}
      <ResponsiveSection Component={CTASection} cmsData={ctaCmsData as any} />

      {/* Process Section */}
      <ResponsiveSection Component={ProcessTimeline} cmsData={processCmsData as any} />

      {/* Case Studies */}
      <ResponsiveSection Component={CaseStudies} cmsData={caseStudiesCmsData as any} />

      {/* WhyChooseUs section */}
      <ResponsiveSection Component={WhyChooseUs} cmsData={whyUsCmsData as any} />

      {/* Campaign Insights */}
      <ResponsiveSection Component={CampaignInsights} cmsData={campaignInsightsCmsData as any} />

      {/* Features Section */}
      <ResponsiveSection Component={FeaturesSection} cmsData={featuresCmsData as any} />

      {/* FAQ Section */}
      <ResponsiveSection Component={FAQSection} cmsData={faqCmsData as any} />

      {/* Testimonial Section */}
      <ResponsiveSection Component={TestimonialSection} cmsData={testimonialCmsData as any} />

      {/* Real Estate Hero */}
      <ResponsiveSection Component={RealEstateHero} cmsData={realEstateHeroCmsData as any} />
    </div>
  )
}

