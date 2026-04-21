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
  section 
}: { 
  component: any, 
  section: string 
}) {
  const cmsData = await getCmsContent('home', section)
  return <ResponsiveSection Component={component} cmsData={cmsData} />
}

function CmsContentSection({ 
  component, 
  section, 
  skeleton 
}: { 
  component: any, 
  section: string, 
  skeleton: React.ReactNode 
}) {
  return (
    <Suspense fallback={skeleton}>
      <CmsDataLinker component={component} section={section} />
    </Suspense>
  )
}

export default function Web() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <CmsContentSection component={HeroSection} section="hero" skeleton={<HeroSkeleton />} />

      {/* Top Performers Section */}
      <CmsContentSection component={TopPerformerSection} section="top-performers" skeleton={<GridSkeleton />} />

      {/* Target Audience - For you / Not for you */}
      <CmsContentSection component={TargetAudienceSection} section="target-audience" skeleton={<ListSkeleton />} />

      {/* The 90-Day Transformation */}
      <CmsContentSection component={TransformationSection} section="transformation" skeleton={<SectionSkeleton />} />

      {/* The Real Problems - Dark section */}
      <CmsContentSection component={ProblemsSection} section="problems" skeleton={<ListSkeleton />} />

      {/* Lead Quality Section */}
      <CmsContentSection component={LeadQualitySection} section="lead-quality" skeleton={<ListSkeleton />} />

      {/* Follow Up Section */}
      <CmsContentSection component={FollowUpSection} section="follow-up" skeleton={<ListSkeleton />} />

      {/* Ad Spend Section */}
      <CmsContentSection component={AdSpendSection} section="adspend" skeleton={<ListSkeleton />} />

      {/* Referral Section */}
      <CmsContentSection component={ReferralSection} section="referral" skeleton={<ListSkeleton />} />

      {/* Fix Section */}
      <CmsContentSection component={FixSection} section="fix" skeleton={<SectionSkeleton />} />

      {/* About Company */}
      <CmsContentSection component={AboutSection} section="about" skeleton={<SectionSkeleton />} />

      {/* Performance Metrics */}
      <CmsContentSection component={PerformanceMetrics} section="performance" skeleton={<GridSkeleton />} />

      {/* Social Proof / Testimonials */}
      <CmsContentSection component={SocialProofSection} section="social-proof" skeleton={<SectionSkeleton />} />

      {/* Reasons Section */}
      <CmsContentSection component={ReasonsSection} section="reasons" skeleton={<GridSkeleton />} />

      {/* Cta Section */}
      <CmsContentSection component={CTASection} section="cta" skeleton={<SectionSkeleton />} />

      {/* Process Section */}
      <CmsContentSection component={ProcessTimeline} section="process" skeleton={<SectionSkeleton />} />

      {/* Case Studies */}
      <CmsContentSection component={CaseStudies} section="case-studies" skeleton={<GridSkeleton />} />

      {/* WhyChooseUs section */}
      <CmsContentSection component={WhyChooseUs} section="why-us" skeleton={<SectionSkeleton />} />

      {/* Campaign Insights */}
      <CmsContentSection component={CampaignInsights} section="campaign-insights" skeleton={<GridSkeleton />} />

      {/* Features Section */}
      <CmsContentSection component={FeaturesSection} section="features" skeleton={<CardSkeleton />} />

      {/* FAQ Section */}
      <CmsContentSection component={FAQSection} section="faq" skeleton={<SectionSkeleton />} />

      {/* Testimonial Section */}
      <CmsContentSection component={TestimonialSection} section="testimonial" skeleton={<SectionSkeleton />} />

      {/* Real Estate Hero */}
      <CmsContentSection component={RealEstateHero} section="real-estate-hero" skeleton={<HeroSkeleton />} />
    </div>
  )
}
