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
import { Suspense } from "react"
import { 
  HeroSkeleton, 
  SectionSkeleton, 
  ListSkeleton, 
  GridSkeleton, 
  CardSkeleton 
} from "@/components/home/skeletons"

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

async function CmsDataLinker({ 
  component, 
  section,
  domain
}: { 
  component: any, 
  section: string,
  domain: string
}) {
  const cmsData = await getCmsContent('home', section, domain)
  return <ResponsiveSection Component={component} cmsData={cmsData} />
}

function CmsContentSection({ 
  component, 
  section, 
  skeleton,
  domain
}: { 
  component: any, 
  section: string, 
  skeleton: React.ReactNode,
  domain: string
}) {
  return (
    <Suspense fallback={skeleton}>
      <CmsDataLinker component={component} section={section} domain={domain} />
    </Suspense>
  )
}

export default async function Web({ params }: { params: Promise<{ domain: string }> | { domain: string } }) {
  // In Next.js 15+ params is a Promise. We await it to extract domain safely.
  const resolvedParams = await params;
  // Fallback to "default" if no domain parameter is provided
  const domain = resolvedParams?.domain || "default";

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <CmsContentSection domain={domain} component={HeroSection} section="hero" skeleton={<HeroSkeleton />} />

      {/* Top Performers Section */}
      <CmsContentSection domain={domain} component={TopPerformerSection} section="top-performers" skeleton={<GridSkeleton />} />

      {/* Target Audience - For you / Not for you */}
      <CmsContentSection domain={domain} component={TargetAudienceSection} section="target-audience" skeleton={<ListSkeleton />} />

      {/* The 90-Day Transformation */}
      <CmsContentSection domain={domain} component={TransformationSection} section="transformation" skeleton={<SectionSkeleton />} />

      {/* The Real Problems - Dark section */}
      <CmsContentSection domain={domain} component={ProblemsSection} section="problems" skeleton={<ListSkeleton />} />

      {/* Lead Quality Section */}
      <CmsContentSection domain={domain} component={LeadQualitySection} section="lead-quality" skeleton={<ListSkeleton />} />

      {/* Follow Up Section */}
      <CmsContentSection domain={domain} component={FollowUpSection} section="follow-up" skeleton={<ListSkeleton />} />

      {/* Ad Spend Section */}
      <CmsContentSection domain={domain} component={AdSpendSection} section="adspend" skeleton={<ListSkeleton />} />

      {/* Referral Section */}
      <CmsContentSection domain={domain} component={ReferralSection} section="referral" skeleton={<ListSkeleton />} />

      {/* Fix Section */}
      <CmsContentSection domain={domain} component={FixSection} section="fix" skeleton={<SectionSkeleton />} />

      {/* About Company */}
      <CmsContentSection domain={domain} component={AboutSection} section="about" skeleton={<SectionSkeleton />} />

      {/* Performance Metrics */}
      <CmsContentSection domain={domain} component={PerformanceMetrics} section="performance" skeleton={<GridSkeleton />} />

      {/* Social Proof / Testimonials */}
      <CmsContentSection domain={domain} component={SocialProofSection} section="social-proof" skeleton={<SectionSkeleton />} />

      {/* Reasons Section */}
      <CmsContentSection domain={domain} component={ReasonsSection} section="reasons" skeleton={<GridSkeleton />} />

      {/* Cta Section */}
      <CmsContentSection domain={domain} component={CTASection} section="cta" skeleton={<SectionSkeleton />} />

      {/* Process Section */}
      <CmsContentSection domain={domain} component={ProcessTimeline} section="process" skeleton={<SectionSkeleton />} />

      {/* Case Studies */}
      <CmsContentSection domain={domain} component={CaseStudies} section="case-studies" skeleton={<GridSkeleton />} />

      {/* WhyChooseUs section */}
      <CmsContentSection domain={domain} component={WhyChooseUs} section="why-us" skeleton={<SectionSkeleton />} />

      {/* Campaign Insights */}
      <CmsContentSection domain={domain} component={CampaignInsights} section="campaign-insights" skeleton={<GridSkeleton />} />

      {/* Features Section */}
      <CmsContentSection domain={domain} component={FeaturesSection} section="features" skeleton={<CardSkeleton />} />

      {/* FAQ Section */}
      <CmsContentSection domain={domain} component={FAQSection} section="faq" skeleton={<SectionSkeleton />} />

      {/* Testimonial Section */}
      <CmsContentSection domain={domain} component={TestimonialSection} section="testimonial" skeleton={<SectionSkeleton />} />

      {/* Real Estate Hero */}
      <CmsContentSection domain={domain} component={RealEstateHero} section="real-estate-hero" skeleton={<HeroSkeleton />} />
    </div>
  )
}
