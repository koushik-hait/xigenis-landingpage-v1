import dynamic from "next/dynamic"
import { HeroSection } from "@/components/home"

const TopPerformerSection = dynamic(() => import("@/components/home/top-performer-section").then(mod => mod.TopPerformerSection))
const AboutSection = dynamic(() => import("@/components/home/about-section").then(mod => mod.AboutSection))
const TargetAudienceSection = dynamic(() => import("@/components/home/target-audience-section").then(mod => mod.TargetAudienceSection))
const ProblemsSection = dynamic(() => import("@/components/home/problems-section").then(mod => mod.ProblemsSection))
const TransformationSection = dynamic(() => import("@/components/home/transformation-section").then(mod => mod.TransformationSection))

const LeadQualitySection = dynamic(() => import("@/components/home/lead-quality-section").then(mod => mod.LeadQualitySection))
const FollowUpSection = dynamic(() => import("@/components/home/followup-section").then(mod => mod.FollowUpSection))
const AdSpendSection = dynamic(() => import("@/components/home/adspend-section").then(mod => mod.AdSpendSection))
const ReferralSection = dynamic(() => import("@/components/home/referral-section").then(mod => mod.ReferralSection))
const FixSection = dynamic(() => import("@/components/home/fix-section").then(mod => mod.FixSection))
const PerformanceMetrics = dynamic(() => import("@/components/home/performance-metrics").then(mod => mod.PerformanceMetrics))
const SocialProofSection = dynamic(() => import("@/components/home/social-proof-section").then(mod => mod.SocialProofSection))
const ReasonsSection = dynamic(() => import("@/components/home/reasons-section").then(mod => mod.ReasonsSection))
const CTASection = dynamic(() => import("@/components/home/cta-section").then(mod => mod.CTASection))
const ProcessTimeline = dynamic(() => import("@/components/home/process-section").then(mod => mod.ProcessTimeline))
const CaseStudies = dynamic(() => import("@/components/home/case-study-section").then(mod => mod.CaseStudies))
const WhyChooseUs = dynamic(() => import("@/components/home/why-us-section").then(mod => mod.WhyChooseUs))
const CampaignInsights = dynamic(() => import("@/components/home/campaign-insights").then(mod => mod.CampaignInsights))
const FeaturesSection = dynamic(() => import("@/components/home/features-section").then(mod => mod.FeaturesSection))
const FAQSection = dynamic(() => import("@/components/home/faq-section").then(mod => mod.FAQSection))
const TestimonialSection = dynamic(() => import("@/components/home/testimonials-section").then(mod => mod.TestimonialSection))
const RealEstateHero = dynamic(() => import("@/components/home/realestate-hero").then(mod => mod.RealEstateHero))
import { getPageContent } from "@/app/actions/cms"
import { Suspense } from "react"
import { 
  HeroSkeleton, 
  SectionSkeleton, 
  ListSkeleton, 
  GridSkeleton, 
  CardSkeleton 
} from "@/components/home/skeletons"

function ResponsiveSection({ Component, cmsData }: { Component: any, cmsData?: any }) {
  const content = cmsData?.desktop || cmsData
  return <Component cmsContent={content} />
}

function SectionWrapper({ 
  component, 
  cmsData, 
  skeleton
}: { 
  component: any, 
  cmsData: any, 
  skeleton: React.ReactNode
}) {
  return (
    <Suspense fallback={skeleton}>
      <ResponsiveSection Component={component} cmsData={cmsData} />
    </Suspense>
  )
}

export default async function Web() {
  // Fetch all CMS content for the home page directly
  const pageContent = await getPageContent('home');

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero - Dark with background image */}
      <SectionWrapper component={HeroSection} cmsData={pageContent['hero']} skeleton={<HeroSkeleton />} />

      {/* Top Performers Section */}
      <SectionWrapper component={TopPerformerSection} cmsData={pageContent['top-performers']} skeleton={<GridSkeleton />} />

      {/* Target Audience - For you / Not for you */}
      <SectionWrapper component={TargetAudienceSection} cmsData={pageContent['target-audience']} skeleton={<ListSkeleton />} />

      {/* The 90-Day Transformation */}
      <SectionWrapper component={TransformationSection} cmsData={pageContent['transformation']} skeleton={<SectionSkeleton />} />

      {/* The Real Problems - Dark section */}
      <SectionWrapper component={ProblemsSection} cmsData={pageContent['problems']} skeleton={<ListSkeleton />} />

      {/* Lead Quality Section */}
      <SectionWrapper component={LeadQualitySection} cmsData={pageContent['lead-quality']} skeleton={<ListSkeleton />} />

      {/* Follow Up Section */}
      <SectionWrapper component={FollowUpSection} cmsData={pageContent['follow-up']} skeleton={<ListSkeleton />} />

      {/* Ad Spend Section */}
      <SectionWrapper component={AdSpendSection} cmsData={pageContent['adspend']} skeleton={<ListSkeleton />} />

      {/* Referral Section */}
      <SectionWrapper component={ReferralSection} cmsData={pageContent['referral']} skeleton={<ListSkeleton />} />

      {/* Fix Section */}
      <SectionWrapper component={FixSection} cmsData={pageContent['fix']} skeleton={<SectionSkeleton />} />

      {/* About Company */}
      <SectionWrapper component={AboutSection} cmsData={pageContent['about']} skeleton={<SectionSkeleton />} />

      {/* Performance Metrics */}
      <SectionWrapper component={PerformanceMetrics} cmsData={pageContent['performance']} skeleton={<GridSkeleton />} />

      {/* Social Proof / Testimonials */}
      <SectionWrapper component={SocialProofSection} cmsData={pageContent['social-proof']} skeleton={<SectionSkeleton />} />

      {/* Reasons Section */}
      <SectionWrapper component={ReasonsSection} cmsData={pageContent['reasons']} skeleton={<GridSkeleton />} />

      {/* Cta Section */}
      <SectionWrapper component={CTASection} cmsData={pageContent['cta']} skeleton={<SectionSkeleton />} />

      {/* Process Section */}
      <SectionWrapper component={ProcessTimeline} cmsData={pageContent['process']} skeleton={<SectionSkeleton />} />

      {/* Case Studies */}
      <SectionWrapper component={CaseStudies} cmsData={pageContent['case-studies']} skeleton={<GridSkeleton />} />

      {/* WhyChooseUs section */}
      <SectionWrapper component={WhyChooseUs} cmsData={pageContent['why-us']} skeleton={<SectionSkeleton />} />

      {/* Campaign Insights */}
      <SectionWrapper component={CampaignInsights} cmsData={pageContent['campaign-insights']} skeleton={<GridSkeleton />} />

      {/* Features Section */}
      <SectionWrapper component={FeaturesSection} cmsData={pageContent['features']} skeleton={<CardSkeleton />} />

      {/* FAQ Section */}
      <SectionWrapper component={FAQSection} cmsData={pageContent['faq']} skeleton={<SectionSkeleton />} />

      {/* Testimonial Section */}
      <SectionWrapper component={TestimonialSection} cmsData={pageContent['testimonial']} skeleton={<SectionSkeleton />} />

      {/* Real Estate Hero */}
      <SectionWrapper component={RealEstateHero} cmsData={pageContent['real-estate-hero']} skeleton={<HeroSkeleton />} />
    </div>
  )
}
