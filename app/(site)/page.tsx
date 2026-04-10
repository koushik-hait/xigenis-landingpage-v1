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
      <HeroSection cmsContent={heroCmsData as any} />

      {/* Top Performers Section */}
      <TopPerformerSection cmsContent={topPerformersCmsData as any} />

      {/* Target Audience - For you / Not for you */}
      <TargetAudienceSection cmsContent={targetAudienceCmsData as any} />

      {/* The 90-Day Transformation */}
      <TransformationSection cmsContent={transformationCmsData as any} />

      {/* The Real Problems - Dark section */}
      <ProblemsSection cmsContent={problemsCmsData as any} />

      {/* Lead Quality Section */}
      <LeadQualitySection cmsContent={leadQualityCmsData as any} />

      {/* Follow Up Section */}
      <FollowUpSection cmsContent={followUpCmsData as any} />

      {/* Ad Spend Section */}
      <AdSpendSection cmsContent={adspendCmsData as any} />

      {/* Referral Section */}
      <ReferralSection cmsContent={referralCmsData as any} />

      {/* Fix Section */}
      <FixSection cmsContent={fixCmsData as any} />

      {/* About Company */}
      <AboutSection cmsContent={aboutCmsData as any} />

      {/* Performance Metrics */}
      <PerformanceMetrics cmsContent={performanceCmsData as any} />

      {/* Social Proof / Testimonials */}
      <SocialProofSection cmsContent={socialProofCmsData as any} />

      {/* Reasons Section */}
      <ReasonsSection cmsContent={reasonsCmsData as any} />

      {/* Cta Section */}
      <CTASection cmsContent={ctaCmsData as any} />

      {/* Process Section */}
      <ProcessTimeline cmsContent={processCmsData as any} />

      {/* Case Studies */}
      <CaseStudies cmsContent={caseStudiesCmsData as any} />

      {/* WhyChooseUs section */}
      <WhyChooseUs cmsContent={whyUsCmsData as any} />

      {/* Campaign Insights */}
      <CampaignInsights cmsContent={campaignInsightsCmsData as any} />

      {/* Features Section */}
      <FeaturesSection cmsContent={featuresCmsData as any} />

      {/* FAQ Section */}
      <FAQSection cmsContent={faqCmsData as any} />

      {/* Testimonial Section */}
      <TestimonialSection cmsContent={testimonialCmsData as any} />

      {/* Real Estate Hero */}
      <RealEstateHero cmsContent={realEstateHeroCmsData as any} />
    </div>
  )
}

